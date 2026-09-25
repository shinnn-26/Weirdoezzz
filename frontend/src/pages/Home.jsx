import React,{useMemo,useRef,useState} from 'react';
import {motion} from 'framer-motion';
import {CalendarDays,Clock3,MapPin,ArrowDown,ArrowUpRight,Phone,CheckCircle2,Music2,Users,ShieldCheck} from 'lucide-react';
import {register} from '../api/api';

const departments=[
 'Artificial Intelligence and Data Science','Artificial Intelligence and Machine Learning','Computer Science and Engineering','Computer Science and Business Systems','Cyber Security',
 'Mechanical Engineering','Electronics and Communication Engineering','Electrical and Electronics Engineering','Biotechnology','Biomedical Engineering','Very Large Scale Integration','Aeronautical Engineering'
];
const csDepartments=new Set(['Artificial Intelligence and Data Science','Artificial Intelligence and Machine Learning','Computer Science and Engineering','Computer Science and Business Systems','Cyber Security']);
const years=['1','2','3','4'];
const studentTypes=['Day Scholar','Day Scholar (College Bus)','Hosteller'];
const danceStyles=['Classical','Folk','Western','Hip-Hop','Contemporary','Bollywood','Freestyle','Other'];
const dates={CS:'7 October 2026','Non-CS':'6 October 2026'};
const gallery=[
  '/assets/gallery-new.png',
  '/assets/gallery-portrait.png',
  '/assets/gallery-9.jpg',
  '/assets/gallery-1.jpg',
  '/assets/gallery-2.jpg',
  '/assets/gallery-3.jpg',
  '/assets/gallery-4.jpg',
  '/assets/gallery-5.jpg',
  '/assets/gallery-6.jpg'
];
const danceEmojis=['💃','🕺','🎶','🎵','🎧','🪩','🎤','✨','🔥','💫','👟','🎼','❤️','🌟','🥳','🎉'];

function FloatingDanceEmojis(){return <div className="floating-emoji-field" aria-hidden="true">{Array.from({length:34},(_,i)=><motion.span key={i} className={`floating-emoji emoji-${i%8}`} initial={{opacity:0}} animate={{opacity:[0,.28,.16,.3,0],y:[35,-20,-100,-190,-310],x:[0,(i%3-1)*18,(i%5-2)*30,(i%4-1.5)*42,(i%3-1)*58],rotate:[-8,6,-4,8,0],scale:[.7,1,1.12,.92,.75]}} transition={{duration:10+(i%7)*1.4,delay:(i*0.73)%9,repeat:Infinity,ease:'easeInOut'}}>{danceEmojis[i%danceEmojis.length]}</motion.span>)}</div>}

function EventCard({cluster}){return <motion.div className="event-card" whileHover={{y:-6}}><div className="event-tag">{cluster}</div><h3>{cluster} AUDITIONS</h3><div className="event-row"><CalendarDays/><span>{dates[cluster]}</span></div><div className="event-row"><Clock3/><span>2:30 PM – 4:30 PM</span></div><div className="event-row"><MapPin/><span>East Block – Dance Floor</span></div></motion.div>}

function Registration(){
 const [form,setForm]=useState({full_name:'',phone:'',department:'',year:'',student_type:'',dance_style:'',experience:'',consent:false});
 const [state,setState]=useState({loading:false,error:'',success:null});
 const cluster=useMemo(()=>form.department?(csDepartments.has(form.department)?'CS':'Non-CS'):'',[form.department]);
 const date=cluster?dates[cluster]:'';
 const change=e=>{const {name,value,type,checked}=e.target;setForm(f=>({...f,[name]:type==='checkbox'?checked:value}))};
 async function submit(e){e.preventDefault();setState({loading:true,error:'',success:null});try{const data=await register({...form,cluster,audition_date:date});setState({loading:false,error:'',success:data});}catch(err){setState({loading:false,error:err.message,success:null})}}
 if(state.success)return <section id="register" className="register section"><div className="success-card"><div className="success-icon"><CheckCircle2/></div><p className="eyebrow">REGISTRATION CONFIRMED</p><h2>YOU’RE IN! 🔥</h2><p>Your WEIRDOEZZZ audition registration has been successfully submitted.</p><div className="ticket"><div><span>Registration ID</span><strong>{state.success.registration_id}</strong></div><div><span>Name</span><strong>{state.success.full_name}</strong></div><div><span>Department</span><strong>{state.success.department}</strong></div><div><span>Audition</span><strong>{state.success.audition_date}</strong></div><div><span>Time</span><strong>2:30 PM – 4:30 PM</strong></div><div><span>Venue</span><strong>East Block – Dance Floor</strong></div></div><p className="save-note">Save your registration ID for reference.</p><button className="btn primary" onClick={()=>setState({loading:false,error:'',success:null})}>Register Another Person</button></div></section>;
 return <section id="register" className="register section"><div className="section-head"><p className="eyebrow">YOUR MOMENT</p><h2>READY TO <em>DANCE?</em></h2><p>Register for the WEIRDOEZZZ audition and bring your energy to the floor.</p></div><form className="form glass" onSubmit={submit}>
  {state.error&&<div className="error">{state.error}</div>}
  <div className="form-grid">
   <Field label="Full Name" name="full_name" value={form.full_name} onChange={change} required/>
   <Field label="Phone Number" name="phone" value={form.phone} onChange={change} required inputMode="tel"/>
   <label><span>Department / Branch *</span><select name="department" value={form.department} onChange={change} required><option value="">Select department</option>{departments.map(d=><option key={d} value={d}>{d}</option>)}</select></label>
   <label><span>Year of Study *</span><select name="year" value={form.year} onChange={change} required><option value="">Select year</option>{years.map(y=><option key={y} value={y}>{y}</option>)}</select></label>
   <label><span>Student Type *</span><select name="student_type" value={form.student_type} onChange={change} required><option value="">Select student type</option>{studentTypes.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
   <label><span>Dance Style *</span><select name="dance_style" value={form.dance_style} onChange={change} required><option value="">Select dance style</option>{danceStyles.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
   <label><span>Audition Category</span><input value={cluster?`${cluster} · ${cluster==='CS'?'CS-related':'Non-CS'}`:''} readOnly placeholder="Auto-assigned from department"/></label>
   <label><span>Audition Date</span><input value={date} readOnly placeholder="Auto-assigned from department"/></label>
   <label className="wide"><span>Previous Dance Experience</span><textarea name="experience" value={form.experience} onChange={change} placeholder="Tell us briefly about your experience..."/></label>
  </div>
  <label className="check"><input type="checkbox" name="consent" checked={form.consent} onChange={change} required/><span>I confirm that the information provided above is correct and I agree to participate in the WEIRDOEZZZ audition.</span></label>
  <button className="btn primary submit" disabled={state.loading}>{state.loading?'Submitting...':'REGISTER NOW'} <ArrowDown/></button>
 </form></section>
}
function Field({label,...props}){return <label><span>{label}{props.required?' *':''}</span><input {...props}/></label>}

const contacts=[
 {name:'Sarvesh',meta:'Final Year – AIML · 9952849291',phone:'9952849291',image:'/assets/contact-sarvesh.jpg'},
 {name:'Rithicka',meta:'Final Year – AI&DS · 8838250351',phone:'8838250351',image:'/assets/contact-rithicka.jpg'},
 {name:'Yuvan',meta:'Final Year – ECE · 9094853407',phone:'9094853407',image:'/assets/contact-yuvan.png'}
];


function Gallery(){
  const rows=[
    gallery.slice(0,3),
    gallery.slice(3,6),
    gallery.slice(6,9)
  ];

  const rowRefs=useRef([]);
  const [ratios,setRatios]=useState({});

  const setImageRatio=(src,e)=>{
    const img=e.currentTarget;
    if(img.naturalWidth && img.naturalHeight){
      setRatios(prev=>({
        ...prev,
        [src]:img.naturalWidth/img.naturalHeight
      }));
    }
  };

  const getRowData=(row)=>{
    const rowRatios=row.map(src=>ratios[src]||1);
    const total=rowRatios.reduce((sum,r)=>sum+r,0);
    return {rowRatios,total};
  };

  return(
    <section id="gallery" className="gallery section">
      <div className="section-head">
        <p className="eyebrow">THE VIBE</p>
        <h2>THIS IS <em>WEIRDOEZZZ.</em></h2>
        <p>Energy. Expression. Attitude. Rhythm.</p>
      </div>

      <div className="gallery-grid">
        {rows.map((row,rowIndex)=>{
          const {rowRatios,total}=getRowData(row);

          return(
            <div
              className="gallery-row"
              key={rowIndex}
              ref={el=>{rowRefs.current[rowIndex]=el}}
            >
              {row.map((src,index)=>{
                const width=`${(rowRatios[index]/total)*100}%`;

                return(
                  <motion.div
                    className="gallery-item"
                    key={src}
                    style={{
                      '--gallery-item-width':width
                    }}
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    viewport={{once:true}}
                    transition={{duration:.45,delay:index*.05}}
                  >
                    <img
                      src={src}
                      alt={`WEIRDOEZZZ dance ${rowIndex*3+index+1}`}
                      loading="lazy"
                      onLoad={e=>setImageRatio(src,e)}
                    />
                    <span className="gallery-index">
                      {String(rowIndex*3+index+1).padStart(2,'0')}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Home(){
 const reveal={hidden:{opacity:0,y:35},show:{opacity:1,y:0,transition:{duration:.75,ease:[.22,1,.36,1]}}};
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
    <motion.div className="institution institution-left" variants={reveal} initial="hidden" animate="show" transition={{delay:.08}}><img src="/assets/college-logo.png" alt="KIT Coimbatore"/><span>KIT COIMBATORE · OFFICIAL DANCE CREW</span></motion.div>
    <motion.h1 variants={reveal} initial="hidden" animate="show" transition={{delay:.16}}>WE ARE <em>WEIRDOEZZZ</em></motion.h1>
    <motion.p className="hero-lead" variants={reveal} initial="hidden" animate="show" transition={{delay:.24}}>A dance community at KIT Coimbatore where passion meets movement. From stage performances to campus events, we bring energy, stories and unforgettable moments through dance.</motion.p>
    <motion.div className="hero-actions hero-actions-left" variants={reveal} initial="hidden" animate="show" transition={{delay:.32}}><a className="btn primary" href="#register">JOIN AUDITIONS <ArrowUpRight/></a><a className="btn ghost" href="#gallery">EXPLORE OUR JOURNEY <ArrowDown/></a></motion.div>
   </div>
   <motion.div className="hero-scroll" animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}}><span>SCROLL TO EXPLORE</span><ArrowDown/></motion.div>
   <div className="hero-dots"><span className="active">01</span><span>02</span><span>03</span></div>
  </section>

  <motion.section className="announcement announcement-v2" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}}><div><p className="eyebrow">REGISTRATIONS ARE OPEN</p><h2>YOUR FLOOR. <em>YOUR MOMENT.</em></h2></div><div className="announcement-meta"><b>7 OCT · CS</b><b>6 OCT · NON-CS</b><span>2:30 PM – 4:30 PM · EAST BLOCK</span></div></motion.section>

  <section id="about" className="about section about-v2"><motion.div className="split" initial="hidden" whileInView="show" viewport={{once:true,margin:'-120px'}} variants={{show:{transition:{staggerChildren:.12}}}}><motion.div className="about-copy" variants={reveal}><p className="eyebrow">WHO WE ARE</p><h2>WE ARE <em>WEIRDOEZZZ</em></h2><p>WEIRDOEZZZ is a college dance community built around rhythm, creativity, expression and the energy of performing together.</p><p>Whether you're an experienced dancer or someone who simply loves moving to music, the audition is your chance to step onto the floor and show us what you've got.</p><div className="mini-stats">{[['Rhythm',Music2],['Community',Users],['Expression',ShieldCheck]].map(([label,Icon])=><motion.span key={label} whileHover={{y:-5,borderColor:'rgba(215,255,50,.45)'}}><Icon/>{label}</motion.span>)}</div></motion.div><motion.div className="about-visual about-visual-v2" variants={reveal}><img src="/assets/about-team.jpg" alt="WEIRDOEZZZ dance crew" loading="lazy"/><div className="visual-caption">ENERGY · EXPRESSION · ATTITUDE · RHYTHM</div><div className="visual-number">01</div></motion.div></motion.div></section>

  <section className="how section"><div className="section-head"><p className="eyebrow">NO CONFUSION. JUST VIBES.</p><h2>HOW IT <em>WORKS</em></h2></div><div className="steps">{['REGISTER ONLINE','SHOW UP AT THE DANCE FLOOR','AUDITION','SHOW YOUR STYLE','WAIT FOR THE RESULT'].map((s,i)=><motion.div className="step" key={s} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span>0{i+1}</span><h3>{s}</h3></motion.div>)}</div></section>
  <Gallery/>
  <Registration/>
  <section id="contact" className="contact section"><div><p className="eyebrow">QUESTIONS?</p><h2>CONTACT THE <em>CREW.</em></h2><p>Have questions about the audition? Reach out to the organizers.</p></div><div className="contacts">{contacts.map(c=><a className="contact-card" key={c.name} href={`tel:${c.phone}`}><img src={c.image} alt={c.name}/><Phone/><span><b>{c.name}</b><small>{c.meta}</small></span></a>)}</div></section>
  <footer><div className="footer-brand"><img src="/assets/weirdoezzz-logo.jpg" alt="WEIRDOEZZZ"/><strong>WEIRDOEZZZ</strong><span>Dance Auditions 2026</span></div><div><b>6 & 7 October 2026</b><span>2:30 PM – 4:30 PM</span><span>East Block – Dance Floor</span></div><div><span>Sarvesh · 9952849291</span><span>Rithicka · 8838250351</span><span>Yuvan · 9094853407</span></div><small>© 2026 WEIRDOEZZZ. All rights reserved.</small></footer>
 </main>
}