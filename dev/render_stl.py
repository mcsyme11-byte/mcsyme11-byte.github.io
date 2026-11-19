"""Renders an STL model to a transparent image (orthographic, shaded) with numpy and Pillow.

Used once for the wingtip pictures on the Studies page (assets/studies/winglets/tip*.webp). The STL files are
not kept in this repository. Example:
    from render_stl import load, render, rot
    render([(load("Tip4.stl"), (201, 168, 108))], "tip4.png", size=560, R=rot("x", -62) @ rot("z", -35))
"""
import numpy as np, struct, sys
from PIL import Image
def load(path):
    d=open(path,'rb').read()
    n=struct.unpack('<I',d[80:84])[0]
    if 84+n*50==len(d):
        a=np.frombuffer(d,dtype=np.dtype([('n','<f4',3),('v','<f4',(3,3)),('a','<u2')]),count=n,offset=84)
        return a['v'].astype(np.float64)
    vs=[]
    for line in d.decode('ascii','ignore').splitlines():
        p=line.split()
        if p and p[0]=='vertex': vs.append([float(x) for x in p[1:4]])
    return np.array(vs).reshape(-1,3,3)
def rot(ax,deg):
    c,s=np.cos(np.radians(deg)),np.sin(np.radians(deg))
    return {'x':np.array([[1,0,0],[0,c,-s],[0,s,c]]),'y':np.array([[c,0,s],[0,1,0],[-s,0,c]]),'z':np.array([[c,-s,0],[s,c,0],[0,0,1]])}[ax]
def render(parts, out, size=900, R=None, pad=0.08, ss=2):
    """parts: list of (tris, rgb). Orthographic, camera looks down -z after rotation R."""
    S=size*ss
    allv=np.concatenate([t.reshape(-1,3) for t,_ in parts])@R.T
    mn,mx=allv.min(0),allv.max(0); c=(mn+mx)/2; ext=max(mx[0]-mn[0],mx[1]-mn[1]); sc=S*(1-2*pad)/ext
    zb=np.full((S,S),-1e18); img=np.zeros((S,S,4),dtype=np.float32)
    L=np.array([-0.45,0.55,0.7]); L/=np.linalg.norm(L); F=np.array([0.5,-0.2,0.6]); F/=np.linalg.norm(F)
    for tris,rgb in parts:
        v=tris@R.T
        n=np.cross(v[:,1]-v[:,0],v[:,2]-v[:,0]); ln=np.linalg.norm(n,axis=1); ok=ln>1e-12
        v=v[ok]; n=n[ok]/ln[ok,None]
        n=np.where(n[:,2:3]<0,-n,n)   # two-sided
        x=(v[:,:,0]-c[0])*sc+S/2; y=S/2-(v[:,:,1]-c[1])*sc; z=v[:,:,2]
        dif=np.clip(n@L,0,1); fil=np.clip(n@F,0,1); rim=(1-n[:,2])**3
        shade=0.30+0.62*dif+0.18*fil
        col=np.clip(np.outer(shade,np.array(rgb)/255.0)+0.10*rim[:,None],0,1)
        for i in range(len(v)):
            x0,x1=int(max(np.floor(x[i].min()),0)),int(min(np.ceil(x[i].max()),S-1))
            y0,y1=int(max(np.floor(y[i].min()),0)),int(min(np.ceil(y[i].max()),S-1))
            if x1<x0 or y1<y0: continue
            xs,ys=np.meshgrid(np.arange(x0,x1+1)+0.5,np.arange(y0,y1+1)+0.5)
            ax,ay,bx,by,cx,cy=x[i,0],y[i,0],x[i,1],y[i,1],x[i,2],y[i,2]
            den=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy)
            if abs(den)<1e-12: continue
            w0=((by-cy)*(xs-cx)+(cx-bx)*(ys-cy))/den; w1=((cy-ay)*(xs-cx)+(ax-cx)*(ys-cy))/den; w2=1-w0-w1
            m=(w0>=-1e-6)&(w1>=-1e-6)&(w2>=-1e-6)
            if not m.any(): continue
            zz=w0*z[i,0]+w1*z[i,1]+w2*z[i,2]
            sub=zb[y0:y1+1,x0:x1+1]; m&=zz>sub
            sub[m]=zz[m]; img[y0:y1+1,x0:x1+1][m]=(*col[i],1.0)
    im=Image.fromarray((img*255).astype(np.uint8),'RGBA').resize((size,size),Image.LANCZOS)
    bb=im.getbbox(); im.save(out); return bb
