import React,{useMemo,useState} from 'react';
import {motion} from 'framer-motion';
import {CalendarDays,Clock3,MapPin,ArrowDown,ArrowUpRight,Phone,CheckCircle2,Music2,Users,ShieldCheck} from 'lucide-react';
import {register} from '../api/api';
const dates={CS:'28 September 2026', 'Non-CS':'29 September 2026'};
const gallery=Array.from({length:10},(_,i)=>`/assets/gallery-${i+1}.jpg`);
const danceEmojis=['💃','🕺','🎶','🎵','🎧','🪩','🎤','✨','🔥','💫','👟','🎼','❤️','🌟','🥳','🎉'];
function FloatingDanceEmojis(){return <div className="floating-emoji-field" aria-hidden="true">{Array.from({length:34},(_,i)=><motion.span key={i} className={`floating-emoji emoji-${i%8}`} initial={{opacity:0}} animate={{opacity:[0,.28,.16,.3,0],y:[35,-20,-100,-190,-310],x:[0,(i%3-1)*18,(i%5-2)*30,(i%4-1.5)*42,(i%3-1)*58],rotate:[-8,6,-4,8,0],scale:[.7,1,1.12,.92,.75]}} transition={{duration:10+(i%7)*1.4,delay:(i*0.73)%9,repeat:Infinity,ease:'easeInOut'}}>{danceEmojis[i%danceEmojis.length]}</motion.span>)}</div>} 
function EventCard({cluster}){return <motion.div className="event-card" whileHover={{y:-6}}><div className="event-tag">{cluster}</div><h3>{cluster} CLUSTERS</h3><div className="event-row"><CalendarDays/><span>{dates[cluster]}</span></div><div className="event-row"><Clock3/><span>2:30 PM – 4:30 PM</span></div><div className="event-row"><MapPin/><span>East Block – Dance Floor</span></div></motion.div>}
function Registration(){const [form,setForm]=useState({cluster:'',full_name:'',college_id:'',phone:'',department:'',year:'',experience:'',consent:false});const [state,setState]=useState({loading:false,error:'',success:null});
 const date=useMemo(()=>form.cluster?dates[form.cluster]:'', [form.cluster]);
 const change=e=>{const {name,value,type,checked}=e.target;setForm(f=>({...f,[name]:type==='checkbox'?checked:value}))};
 async function submit(e){e.preventDefault();setState({loading:true,error:'',success:null});try{const data=await register({...form,audition_date:date});setState({loading:false,error:'',success:data});}catch(err){setState({loading:false,error:err.message,success:null})}}
 if(state.success)return <section id="register" className="register section"><div className="success-card"><div className="success-icon"><CheckCircle2/></div><p className="eyebrow">REGISTRATION CONFIRMED</p><h2>YOU’RE IN! 🔥</h2><p>Your WEIRDOEZZZ audition registration has been successfully submitted.</p><div className="ticket"><div><span>Registration ID</span><strong>{state.success.registration_id}</strong></div><div><span>Name</span><strong>{state.success.full_name}</strong></div><div><span>Cluster</span><strong>{state.success.cluster}</strong></div><div><span>Audition</span><strong>{state.success.audition_date}</strong></div><div><span>Time</span><strong>2:30 PM – 4:30 PM</strong></div><div><span>Venue</span><strong>East Block – Dance Floor</strong></div></div><p className="save-note">Save your registration ID for reference.</p><button className="btn primary" onClick={()=>setState({loading:false,error:'',success:null})}>Register Another Person</button></div></section>;
 return <section id="register" className="register section"><div className="section-head"><p className="eyebrow">YOUR MOMENT</p><h2>READY TO <em>DANCE?</em></h2><p>Register for the WEIRDOEZZZ audition and bring your energy to the floor.</p></div><form className="form glass" onSubmit={submit}>
  {state.error&&<div className="error">{state.error}</div>}
  <div className="form-grid"><Field label="Full Name" name="full_name" value={form.full_name} onChange={change} required/><Field label="Register Number / College ID" name="college_id" value={form.college_id} onChange={change} required/><Field label="Phone Number" name="phone" value={form.phone} onChange={change} required/><Field label="Department / Branch" name="department" value={form.department} onChange={change} required/><Field label="Year of Study" name="year" value={form.year} onChange={change} required placeholder="e.g. 2"/>
  <label><span>Cluster *</span><select name="cluster" value={form.cluster} onChange={change} required><option value="">Select cluster</option><option>CS</option><option>Non-CS</option></select></label><label><span>Preferred Audition Date</span><input value={date} readOnly placeholder="Auto-assigned"/></label>
  <label className="wide"><span>Previous Dance Experience</span><textarea name="experience" value={form.experience} onChange={change} placeholder="Tell us briefly about your experience..."/></label></div>
  <label className="check"><input type="checkbox" name="consent" checked={form.consent} onChange={change} required/><span>I confirm that the information provided above is correct and I agree to participate in the WEIRDOEZZZ audition.</span></label>
  <button className="btn primary submit" disabled={state.loading}>{state.loading?'Submitting...':'REGISTER NOW'} <ArrowDown/></button>
 </form></section>}
function Field({label,...props}){return <label><span>{label}{props.required?' *':''}</span><input {...props}/></label>}
export function Home(){
 const reveal={hidden:{opacity:0,y:35},show:{opacity:1,y:0,transition:{duration:.75,ease:[.22,1,.36,1]}}};
 const heroItems=['RHYTHM','COMMUNITY','EXPRESSION','BELONG'];
 return <main>
  <FloatingDanceEmojis/>
  <section className="hero hero-v2">
   <div className="hero-bg"/>
   <div className="hero-vignette"/>
   <motion.div className="hero-orb orb-a" animate={{y:[0,-18,0],x:[0,8,0]}} transition={{duration:7,repeat:Infinity,ease:'easeInOut'}}/>
   <motion.div className="hero-orb orb-b" animate={{y:[0,20,0],x:[0,-10,0]}} transition={{duration:9,repeat:Infinity,ease:'easeInOut'}}/>
   <div className="hero-side-label">DANCE · EXPRESS · BELONG</div>
   <div className="hero-content hero-content-v2">
    <motion.div className="hero-topline" variants={reveal} initial="hidden" animate="show"><span/> MOVE · EXPRESS · BELONG</motion.div>
    <motion.div className="institution institution-left" variants={reveal} initial="hidden" animate="show" transition={{delay:.08}}>
      <img src="/assets/college-logo.png" alt="KIT Coimbatore"/>
      <span>KIT COIMBATORE · OFFICIAL DANCE CREW</span>
    </motion.div>
    <motion.h1 variants={reveal} initial="hidden" animate="show" transition={{delay:.16}}>WE ARE <em>WEIRDOEZZZ</em></motion.h1>
    <motion.p className="hero-lead" variants={reveal} initial="hidden" animate="show" transition={{delay:.24}}>A dance community at KIT Coimbatore where passion meets movement. From stage performances to campus events, we bring energy, stories and unforgettable moments through dance.</motion.p>
    <motion.div className="hero-actions hero-actions-left" variants={reveal} initial="hidden" animate="show" transition={{delay:.32}}>
      <a className="btn primary" href="#register">JOIN AUDITIONS <ArrowUpRight/></a>
      <a className="btn ghost" href="#gallery">EXPLORE OUR JOURNEY <ArrowDown/></a>
    </motion.div>
   </div>
   <motion.div className="hero-scroll" animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}><span>SCROLL TO EXPLORE</span><ArrowDown/></motion.div>
   <div className="hero-dots"><span className="active">01</span><span>02</span><span>03</span></div>
  </section>

  <motion.section className="announcement announcement-v2" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}}>
    <div><p className="eyebrow">REGISTRATIONS ARE OPEN</p><h2>YOUR FLOOR. <em>YOUR MOMENT.</em></h2></div>
    <div className="announcement-meta"><b>28 SEPT · CS</b><b>29 SEPT · NON-CS</b><span>2:30 PM – 4:30 PM · EAST BLOCK</span></div>
  </motion.section>

  <section id="about" className="about section about-v2">
   <motion.div className="split" initial="hidden" whileInView="show" viewport={{once:true,margin:'-120px'}} variants={{show:{transition:{staggerChildren:.12}}}}>
    <motion.div className="about-copy" variants={reveal}>
      <p className="eyebrow">WHO WE ARE</p><h2>WE ARE <em>WEIRDOEZZZ</em></h2>
      <p>WEIRDOEZZZ is a college dance community built around rhythm, creativity, expression and the energy of performing together.</p>
      <p>Whether you're an experienced dancer or someone who simply loves moving to music, the audition is your chance to step onto the floor and show us what you've got.</p>
      <div className="mini-stats">{[['Rhythm',Music2],['Community',Users],['Expression',ShieldCheck]].map(([label,Icon])=><motion.span key={label} whileHover={{y:-5,borderColor:'rgba(215,255,50,.45)'}}><Icon/>{label}</motion.span>)}</div>
    </motion.div>
    <motion.div className="about-visual about-visual-v2" variants={reveal}>
      <img src="/assets/gallery-1.jpg" alt="WEIRDOEZZZ stage performance" loading="lazy"/>
      <div className="visual-caption">ENERGY · EXPRESSION · ATTITUDE · RHYTHM</div>
      <div className="visual-number">01</div>
    </motion.div>
   </motion.div>
  </section>

  <section id="audition" className="audition section"><div className="section-head"><p className="eyebrow">MARK YOUR CALENDAR</p><h2>THE FLOOR IS <em>YOURS.</em></h2></div><div className="event-grid"><EventCard cluster="CS"/><EventCard cluster="Non-CS"/></div></section>
  <section className="how section"><div className="section-head"><p className="eyebrow">NO CONFUSION. JUST VIBES.</p><h2>HOW IT <em>WORKS</em></h2></div><div className="steps">{['REGISTER ONLINE','SHOW UP AT THE DANCE FLOOR','AUDITION','SHOW YOUR STYLE','WAIT FOR THE RESULT'].map((s,i)=><motion.div className="step" key={s} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span>0{i+1}</span><h3>{s}</h3></motion.div>)}</div></section>
  <section id="gallery" className="gallery section"><div className="section-head"><p className="eyebrow">THE VIBE</p><h2>THIS IS <em>WEIRDOEZZZ.</em></h2><p>Energy. Expression. Attitude. Rhythm.</p></div><div className="gallery-grid">{gallery.map((src,i)=><motion.div className={`gallery-item g${i+1}`} key={src} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.5,delay:(i%4)*.06}} whileHover={{y:-5}}><img src={src} alt={`WEIRDOEZZZ dance ${i+1}`} loading="lazy"/><div className="img-shade"/><span className="gallery-index">0{i+1}</span></motion.div>)}</div></section>
  <Registration/>
  <section id="contact" className="contact section"><div><p className="eyebrow">QUESTIONS?</p><h2>CONTACT THE <em>CREW.</em></h2><p>Have questions about the audition? Reach out to the organizers.</p></div><div className="contacts"><a href="tel:9952849291"><Phone/> <span><b>Sarvesh</b><small>Final Year – AIML · 9952849291</small></span></a><a href="tel:9094853407"><Phone/> <span><b>Yuvan</b><small>Final Year – ECE · 9094853407</small></span></a></div></section>
  <footer><div className="footer-brand"><img src="/assets/weirdoezzz-logo.jpg" alt="WEIRDOEZZZ"/><strong>WEIRDOEZZZ</strong><span>Dance Auditions 2026</span></div><div><b>28 & 29 September 2026</b><span>2:30 PM – 4:30 PM</span><span>East Block – Dance Floor</span></div><div><span>Sarvesh · 9952849291</span><span>Yuvan · 9094853407</span></div><small>© 2026 WEIRDOEZZZ. All rights reserved.</small></footer>
 </main>
}
