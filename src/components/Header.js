import React from 'react'
import Navbar from './Navbar'
export default function Header() {
  return (
    <div id="header">
		<Navbar/>
				<span class="logo icon fa-paper-plane"></span>
				<h1>Hi. This is Directive.</h1>
				<p>A responsive HTML5 + CSS3 site template designed by <a href="http://html5up.net">HTML5 UP</a>
				<br />
				and released for free under the <a href="http://html5up.net/license">Creative Commons license</a>.</p>
	</div>
  )
}
