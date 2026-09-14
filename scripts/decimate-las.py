import numpy as np, json, time, os, sys, math
SRC='/home/buengenio/Downloads/HFAX_PC.las'; OUT='/home/buengenio/Projects/intelimaris-web/public/assets/demo'
OFF=1792; N=220406829; SL=2_000_000; VOX=0.8; TARGET=1_200_000; PREVIEW=150_000
dt=np.dtype([('x','<i4'),('y','<i4'),('z','<i4'),('i','<u2'),('rf','u1'),('cf','u1'),('c','u1'),('u','u1'),('sa','<i2'),('ps','<u2'),('t','<f8'),('r','<u2'),('g','<u2'),('b','<u2'),('xb','V4')])
mm=np.memmap(SRC,dtype=dt,mode='r',offset=OFF,shape=(N,))
MINX,MINY=498297644,3230303577-3_000_000_000   # int32 mm units, offsets applied (y offset 3,000,000 m)
ZLO,ZHI=-31000,-2000
nx=int(784.1/VOX)+2; ny=int(958.2/VOX)+2
acc={k:[] for k in ('key','x','y','z','r','g','b','i','rf')}
def consolidate():
    if not acc['key']: return
    for k in acc: acc[k]=[np.concatenate(acc[k])]
    u,idx=np.unique(acc['key'][0],return_index=True)
    for k in acc: acc[k]=[acc[k][0][idx]]
t0=time.time(); log=open(OUT+'/decimate.log','w')
for s in range(0,N,SL):
    sl=mm[s:s+SL]
    z=sl['z']; m=(z>=ZLO)&(z<=ZHI)
    sl=sl[m]
    ix=((sl['x']-MINX)//int(VOX*1000)).astype(np.int64); iy=((sl['y']-MINY)//int(VOX*1000)).astype(np.int64); iz=((sl['z']-ZLO)//int(VOX*1000)).astype(np.int64)
    key=ix+iy*nx+iz*nx*ny
    u,idx=np.unique(key,return_index=True)
    k=sl[idx]
    acc['key'].append(u); acc['x'].append(k['x'].copy()); acc['y'].append(k['y'].copy()); acc['z'].append(k['z'].copy())
    acc['r'].append((k['r']>>8).astype(np.uint8)); acc['g'].append((k['g']>>8).astype(np.uint8)); acc['b'].append((k['b']>>8).astype(np.uint8))
    acc['i'].append(np.clip(k['i'].astype(np.float32)/160.0,0,255).astype(np.uint8)); acc['rf'].append(k['rf'].copy())
    del sl,k,key,ix,iy,iz
    if (s//SL)%8==7: consolidate()
    if (s//SL)%10==0:
        log.write(f'{s/N*100:5.1f}%  kept {sum(len(a) for a in acc["key"]):,}  {time.time()-t0:.0f}s\n'); log.flush()
consolidate()
key=acc['key'][0]; X=acc['x'][0].astype(np.float64)*0.001; Y=acc['y'][0].astype(np.float64)*0.001; Z=acc['z'][0].astype(np.float64)*0.001
R,G,B,I,RF=acc['r'][0],acc['g'][0],acc['b'][0],acc['i'][0],acc['rf'][0]
log.write(f'unique voxels {len(key):,}  {time.time()-t0:.0f}s\n'); log.flush()
# ground: 2 m grid minimum (after the -31 m noise clip)
GX=2.0; gx=((X-X.min())//GX).astype(np.int64); gy=((Y-Y.min())//GX).astype(np.int64); gnx=int(gx.max())+1
gkey=gx+gy*gnx; order=np.argsort(gkey,kind='stable'); gk=gkey[order]; gz=Z[order]
starts=np.r_[0,np.flatnonzero(np.diff(gk))+1]; cellmin=np.minimum.reduceat(gz,starts); cellkeys=gk[starts]
ground=np.empty(len(Z)); ground[order]=np.repeat(cellmin,np.diff(np.r_[starts,len(gk)]))
HAG=np.clip(Z-ground,0,25.5)
retn=(RF&0x0f); nret=(RF>>4)&0x0f
band=np.zeros(len(Z),np.uint8)                       # 0 ground / water surface
band[(HAG>=0.3)&(HAG<3)]=1                            # 1 low structure: docks, vessels, vehicles
band[(HAG>=3)&(HAG<10)&(nret<=1)]=2                   # 2 mid structure: buildings, superstructure
band[(HAG>=0.3)&(nret>1)]=3                           # 3 canopy / vegetation (multiple returns)
band[(HAG>=10)&(nret<=1)]=4                           # 4 high structure
# budget: keep all above-ground, fill with ground
rng=np.random.default_rng(7); above=np.flatnonzero(band!=0); grd=np.flatnonzero(band==0)
if len(above)>TARGET: above=rng.choice(above,TARGET,replace=False)
fill=max(0,TARGET-len(above)); grd=rng.choice(grd,min(fill,len(grd)),replace=False)
sel=np.sort(np.concatenate([above,grd]))
def write(name, idx):
    x,y,z=X[idx],Y[idx],Z[idx]
    bx=(X.min(),X.max()); by=(Y.min(),Y.max()); bz=(Z.min(),Z.max())
    q=lambda v,lo,hi: np.round((v-lo)/(hi-lo)*65535).astype(np.uint16)
    pos=np.stack([q(x,*bx),q(y,*by),q(z,*bz)],1).ravel()
    parts=[pos.tobytes(), np.stack([R[idx],G[idx],B[idx]],1).ravel().tobytes(), I[idx].tobytes(),
           np.round(HAG[idx]*10).astype(np.uint8).tobytes(), band[idx].tobytes(), np.clip(nret[idx],0,15).astype(np.uint8).tobytes()]
    sizes=[len(p) for p in parts]
    open(f'{OUT}/{name}.bin','wb').write(b''.join(parts))
    return {'count':int(len(idx)),'bytes':int(sum(sizes)),'layout':{'pos_u16x3':sizes[0],'rgb_u8x3':sizes[1],'intensity_u8':sizes[2],'hag_dm_u8':sizes[3],'band_u8':sizes[4],'nreturns_u8':sizes[5]},
            'bounds':{'x':list(bx),'y':list(by),'z':list(bz)}}
full=write('hfax',sel); prev=write('hfax-preview',np.sort(rng.choice(sel,PREVIEW,replace=False)))
bc=[int((band[sel]==b).sum()) for b in range(5)]
meta={'source':'HFAX_PC.las','generator':'LP360 (GeoCue)','las_version':'1.4','point_format':7,'source_points':N,'crs':'WGS 84 / UTM zone 17N, ellipsoid heights (m)',
      'centroid_wgs84':[29.20581,-81.01366],'extent_m':[784.0,958.1,75.4],'voxel_m':VOX,'ground_grid_m':GX,'z_clip_m':[-31,-2],
      'classification_in_source':'none (all points class 0)','bands':['Ground / water surface','Low structure: docks, vessels, vehicles (0.3–3 m)','Mid structure: buildings, superstructure (3–10 m, single return)','Canopy / vegetation (multiple returns)','High structure (>10 m, single return)'],
      'band_counts':bc,'ground_level_m_ellipsoid':float(np.median(ground)),'full':full,'preview':prev,'built':time.strftime('%Y-%m-%d')}
json.dump(meta,open(OUT+'/hfax.json','w'),indent=1)
log.write(f'DONE full={full["count"]:,} ({full["bytes"]/1e6:.1f} MB) preview={prev["count"]:,} bands={bc} {time.time()-t0:.0f}s\n'); log.close()
