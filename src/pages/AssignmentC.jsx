import React from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'

const AssignmentC = () => {
  return (
	<div className='isar-container'>
		<Container >
			<Row>
				<Col className='mt-4'>
				<Card>
					<Card.Body>
					<Card.Title>Suggestion for potential improvements in current Api structure</Card.Title>
						<Accordion defaultActiveKey={['0',"1","2","3","4","5","6","7","8"]} alwaysOpen>
							<Accordion.Item eventKey="0">
								<Accordion.Header>CORS Configuration</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>As I have previously highlighted the CORS issue and Joana Lourenco and the tech team has already resolved this. Thanks for the quick response!</li>
									</ul>
									</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1" alwaysOpen>
								<Accordion.Header>Consistent Naming Conventions</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Ensure consistent naming conventions across endpoints. For instance, if one endpoint uses camelCase for property names, ensure that all endpoints follow the same convention for better readability and maintainability.</li>
										<li>For instance, the "api/SpectrumStatus" [GET] response features properties like "altitude" and "temperature" in lowercase, while "api/SpectrumWS" presents them with initial capitals ("Altitude" and "Temperature"). To enhance readability and maintainability, align the naming conventions for these properties consistently across all endpoints. This ensures a standardized and coherent structure, simplifying development and reducing potential errors.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="2" alwaysOpen>
								<Accordion.Header>Pagination</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Consider adding support for pagination in the API, especially if the data set grows over time. This will help in managing large datasets efficiently.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="3" alwaysOpen>
								<Accordion.Header>Filtering</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Implement filtering options to allow clients to request specific subsets of data, reducing the amount of unnecessary data transfer.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="5" alwaysOpen>
								<Accordion.Header>Standardized Error Handling</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Implement standardized error responses for better client understanding. Include relevant error codes, messages, and possible resolutions. This will enhance the overall reliability of the API.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="6" alwaysOpen>
								<Accordion.Header>API Documentation</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Provide comprehensive and up-to-date API documentation. Include details on endpoints, request/response formats, error handling, and any potential changes to the API. This will facilitate easier integration for developers.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="7" alwaysOpen>
								<Accordion.Header>Standardized Response Format</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>Ensure a consistent and standardized response format across all endpoints. This makes it easier for clients to parse and handle responses consistently.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="8" alwaysOpen>
								<Accordion.Header>Closing Note: A Positive Outlook for Collaboration</Accordion.Header>
								<Accordion.Body>
									<ul>
										<li>In concluding my observations, I believe these refinements will contribute to the overall effectiveness of our systems.</li>
										<li>While these are the observations for now, I look forward to the opportunity of implementing these suggestions collaboratively in a team setting. Your positive response is anticipated, and I am eager to enhance the functionality and cohesion of our project together.</li>
										<li>Thank you. Danke.</li>
									</ul>
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</Card.Body>
				</Card>
				</Col>
			</Row>
		</Container>
	</div>
  )
}

export default AssignmentC