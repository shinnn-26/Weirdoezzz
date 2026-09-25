import React,{useState} from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';
import {Home} from './pages/Home';
import {Admin} from './pages/Admin';

export default function App(){
 const [open,setOpen]=useState(false); const nav=useNavigate();
 const links=[['about','About'],['gallery','Gallery'],['register','Register'],['contact','Contact']];
 return <Routes>
  <Route path="/admin" element={<Admin/>}/>
  <Route path="*" element={<>
   <motion.header className="nav" initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.7,ease:[.22,1,.36,1]}}>
    <div className="nav-inner">
      <button className="brand-mini" onClick={()=>nav('/')} aria-label="WEIRDOEZZZ home">
        <img src="/assets/weirdoezzz-logo.jpg" alt="WEIRDOEZZZ"/>
        <span>WEIRDOEZZZ<small>DANCE CREW · KIT COIMBATORE</small></span>
      </button>
      <nav className={open?'mobile-open':''}>{links.map(([id,label])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <a className="nav-cta" href="#register">AUDITIONS <ArrowUpRight/></a>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </div>
   </motion.header>
   <AnimatePresence>{open&&<motion.div className="mobile-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>}</AnimatePresence>
   <Home/>
  </>}/>
 </Routes>
}
