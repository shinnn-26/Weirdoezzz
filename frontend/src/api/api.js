const configuredApi=(import.meta.env.VITE_API_URL || 'https://weirdoezzz.onrender.com').replace(/\/$/,'');
const API=configuredApi.endsWith('/api')?configuredApi:`${configuredApi}/api`;
async function request(path, options={}){
  const res=await fetch(`${API}${path}`,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
  const data=await res.json().catch(()=>({detail:'Unexpected server response'}));
  if(!res.ok) throw new Error(data.detail || 'Request failed');
  return data;
}
export const register=payload=>request('/register',{method:'POST',body:JSON.stringify(payload)});
export const adminLogin=payload=>request('/admin/login',{method:'POST',body:JSON.stringify(payload)});
export const adminStats=token=>request('/admin/stats',{headers:{Authorization:`Bearer ${token}`}});
export const adminRegistrations=(token,query='')=>request(`/admin/registrations${query?`?${query}`:''}`,{headers:{Authorization:`Bearer ${token}`}});
export const adminUpdate=(token,id,status)=>request(`/admin/registrations/${id}/status`,{method:'PATCH',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify({status})});
export const adminSync=(token,id)=>request(`/admin/registrations/${id}/sync`,{method:'POST',headers:{Authorization:`Bearer ${token}`}});
