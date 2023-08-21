import {React,useState} from 'react'
import { useAuth } from '../../Contexts/AuthContext';
import Cookies from 'js-cookie';

export default function Contact() {

	const [contactData, setContactData] = useState({
		id:Cookies.get('id') || '',
		name: Cookies.get('userName') || '',
		email: Cookies.get('userEmail') || '',
		message: '',
	  });
	
	  const {api} = useAuth();
	  const handleContact = () => {
		api.post('/api/contact/add', contactData)
		  .then(response => {
			console.log(response.data.message);
		  })
		  .catch(error => {
			console.error('Error updating user data:', error);
		  });
	  };

  return (
<div class="container medium">
					<header class="major last">
						<h2>Questions or comments?</h2>
					</header>

					<p>Vitae natoque dictum etiam semper magnis enim feugiat amet curabitur tempor
					orci penatibus. Tellus erat mauris ipsum fermentum etiam vivamus.</p>

					<form method="post" action="#">
						<div class="row">
							<div class="col-6 col-12-mobilep">
								<input type="text" name="name" placeholder="Name" 
								value={contactData.name}
              					onChange={event =>
                				setContactData(prevData => ({
                  				...prevData,
                  				name: event.target.value,
                				}))
             					}/>
							</div>
							<div class="col-6 col-12-mobilep">
								<input type="email" name="email" placeholder="Email"
								value={contactData.email}
								onChange={event =>
								setContactData(prevData => ({
								...prevData,
								email: event.target.value,
							  }))
							   }/>
							</div>
							<div class="col-12">
								<textarea name="message" placeholder="Message" rows="6"
								value={contactData.message}
								onChange={event =>
								setContactData(prevData => ({
								...prevData,
								message: event.target.value,
							  }))
							   }/>
							</div>
							<div class="col-12">
								<ul class="actions special">
									<li><button className="btn btn-primary button" style={{color: '#ffffff'}} onClick={handleContact}>Save Changes</button></li>
									<li><button className="btn border button" onClick={()=>{setContactData(prevData => ({...prevData,message: ""}))}}>Cancel</button></li>
								</ul>
							</div>
						</div>
					</form>
    </div>
    
  );
}
