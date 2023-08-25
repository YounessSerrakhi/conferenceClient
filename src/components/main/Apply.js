import React from 'react'
import { Link } from 'react-router-dom'

export default function Apply() {
  return (
    <footer class="major container medium">
					<h3>Get shady with science</h3>
					<p>If you're a tech-focused PhD student, seize the opportunity to apply now and secure your spot in this event.</p>
					<ul class="actions special">
						<li><Link to="/apply" class="button">Apply</Link></li>
					</ul>
	</footer>
  )
}
