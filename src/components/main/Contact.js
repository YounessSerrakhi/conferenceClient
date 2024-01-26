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
	  
	  const handleContact = (e) => {
		e.preventDefault();
		api.defaults.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
		api.post('/api/contact/add', contactData)
		  .then(response => {
			alert("message sent succesfuly");
			setContactData(prevData => ({
				...prevData,
				message:"",
			  }))
		  })
		  .catch(error => {
			console.error('Error sending:', error);
		  });
	  };

  return (
<div class="box container medium" id='contact'>
					<header class="major last">
						<h2>Questions or comments?</h2>
					</header>

					<p>If you have any questions or comments regarding the 4th Conference on Applied Sciences & Computer Engineering (CASCE’23), we'd love to hear from you. Our dedicated team is here to assist and provide the information you need. Feel free to reach out to us through our contact form or by emailing us directly at <strong>casce2023@gmail.com</strong>.</p>
<p>We highly value your feedback and look forward to engaging with you as we prepare for this exciting event on November 30, 2023, in Marrakech, Morocco.</p>

					<form onSubmit={handleContact}>
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
									<li><button className="btn btn-primary button" style={{color: '#ffffff'}} type='submit'>Send</button></li>
									<li><button className="btn border button" onClick={()=>{setContactData(prevData => ({...prevData,message: ""}))}}>Cancel</button></li>
								</ul>
							</div>
						</div>
					</form>
    </div>
    
  );
}
