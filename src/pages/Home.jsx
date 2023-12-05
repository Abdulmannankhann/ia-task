import React from 'react'
import SpectrumVideo from "../assets/videos/spectrum.mp4"

const Home = () => {
  return (
	<div className=''>
		<main>
          
		  <div class="text-white bg-black">
		
			<section class="relative mb-20 text-white bg-black h-screen-100">
					<div class="absolute inset-0">
							<video src={SpectrumVideo} 
							preload
							autoPlay
							playsInline
							loop
							muted
							className="spectrum__video object-cover object-center w-full h-full"></video>
			  
				</div>
			
			<div class="relative flex flex-col justify-end h-full pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-14 px-wrapper-mobile lg:px-wrapper-desktop">
				<div class="lg:w-7/12">
									<div class="my-4 text-white digit circle-decoration circle-decoration--filled">Spectrum</div>
					
									<h1 class="mb-8 lg:mb-0">2 Stage Orbital <br/>Launch Vehicle</h1>
							</div>
		
							</div>
		</section> </div>
		

		
		  <div id="successfully-sent" class="pt-5 pb-28 bg-gradient-sunset mb-20 md:mb-32">
			<div class="wrapper-full">
			  <div class="max-w-2xl mx-auto text-center">
				<div class="mx-auto w-max">
				  <div class="my-4 digit circle-decoration text-primary">Technical Information</div>
				</div>
				<h3 class="mb-5 text-3xl lg:text-6xl">Payload User Guide</h3>
				<p>The user guide is available on request, please fill in the form below.</p>
		
				
				
				<form method="post" action="" accept-charset="UTF-8" class="max-w-lg mx-auto mt-9">
				  <input type="hidden" name="CRAFT_CSRF_TOKEN" value="tOVpUpY7V1ir3d5PToiHf0li2dWQUtQRcFNyrsbUJkisgAa95YDYzYaQB2DDVhQ0_LKSe3fksh4jEeu0wgCmel0DBpeU7BIR-vpK8LPHmrk="/>
				  <input type="hidden" name="action" value="contact-form/send"/>
				  <input type="hidden" name="redirect" value="bbbc19b74f9fd8a7f6b6899a615cb5c511f5d11c5a557d5763c0cea840a0de13spectrum#successfully-sent"/>
		
							  
					<input type="hidden" name="subject" value="Request for Payload User Guide"/>
		
					<div class="mb-3 lg:flex lg:space-x-3">
					  <div class="mb-3 lg:mb-0 lg:w-6/12">
						<input type="text" id="from-name" class="block w-full form-input py-3 px-5 rounded-full border-transparent bg-white" name="fromName" value="" placeholder="Your Name" autocomplete="name"/>
						
					  </div>
					  <div class="lg:w-6/12">
						<input type="text" id="company" class="block w-full form-input py-3 px-5 rounded-full border-transparent bg-white" name="message[company]" value="" placeholder="Company Name" autocomplete="organization"/>
						
					  </div>
					</div>
		
					<div class="relative">
					  <input type="email" id="from-email" class="block w-full form-input py-3 px-5 rounded-full border-transparent bg-white" name="fromEmail" value="" placeholder="Your E-Mail Address" autocomplete="email"/>
					  
					</div>
		
					<div class="mt-3">
					  <input id="honeypot-rocket" name="honeypot-rocket" type="text" class="hidden"/>
					  <button type="submit" class="mt-4 btn-primary">Send request</button>
					</div>
						  </form>
			  </div>
			</div>
		  </div>
		
		  <section class="hero relative text-white rounded-xl overflow-hidden bg-grey-light m-wrapper-mobile lg:m-wrapper-desktop mb-8 lg:mb-11">
				<div class="absolute inset-0">
					<img src="/static/launch/hero_journey.jpg" alt="" class="object-cover object-center w-full h-full" loading="lazy"/>
			
			</div>
		  
			<div class="absolute inset-0 bg-gradient-hero"></div>
		
			<div class="relative flex flex-col justify-center items-center h-full w-full px-4 py-6 lg:px-8 lg:py-12">
			
				  <h3 class="text-3xl md:text-7xl text-center md:w-8/12 2xl:w-7/12">Book your launch today</h3>
			
			
						  <a href="/launch" class="btn-white w-8/12 inline-flex justify-center md:w-auto mt-8 lg:mt-14" onclick="" target="">
				<span class="inline-flex justify-center w-full">Launch with us</span>
			</a>
			  </div>
		</section>
		
				</main>
	</div>
  )
}

export default Home