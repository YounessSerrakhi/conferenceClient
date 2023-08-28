import React from 'react'
import { Link } from 'react-router-dom'

export default function Apply() {
	
  return (
    <footer class="major container medium" style={{background:'#0e1ec0',color:"white",width:'100vw'}}>
					<h3 style={{color:"#4FB1F0"}}>Get shady with science</h3>
					<p>If you're a tech-focused PhD student, seize the opportunity to apply now and secure your spot in this event.</p>
					<ul class="actions special">
						<li><Link to="/apply" class="btn border button">Apply</Link></li>
					</ul>
	</footer>
  )
}
