import React from 'react'

export default function Footer() {
  return (
    <div id="footer">
				<div class="container medium">

					<header class="major last">
						<h2>Questions or comments?</h2>
					</header>

					<p>Vitae natoque dictum etiam semper magnis enim feugiat amet curabitur tempor
					orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus.</p>

					<form method="post" action="#">
						<div class="row">
							<div class="col-6 col-12-mobilep">
								<input type="text" name="name" placeholder="Name" />
							</div>
							<div class="col-6 col-12-mobilep">
								<input type="email" name="email" placeholder="Email" />
							</div>
							<div class="col-12">
								<textarea name="message" placeholder="Message" rows="6"></textarea>
							</div>
							<div class="col-12">
								<ul class="actions special">
									<li><input type="submit" value="Send Message" /></li>
								</ul>
							</div>
						</div>
					</form>

					<ul class="icons">
						<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
						<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
						<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
						<li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
						<li><a href="#" class="icon brands fa-dribbble"><span class="label">Dribbble</span></a></li>
					</ul>

					<ul class="copyright">
						<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
					</ul>

				</div>
			</div>

  )
}
