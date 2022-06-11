import { Card } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div border="secondary" className="Footer">
        <Card border="secondary" className="Footer">
          <Card.Body className="cardFooter">
          <a href="https://www.linkedin.com/in/martinneme" alt="Linkedin"><img class="Linkedin" src="../img/Linkedin.png" width="10%" tag="link a Linkedin" alt="linkedin"></img></a>
          <p>Te Espero!</p>
          </Card.Body>
          <Card.Body className="cardFooter">
            <Card.Text>Proyecto React</Card.Text>
            <Card.Text>Buenos Aires,AR</Card.Text>
            
          </Card.Body>
          <Card.Body className="cardFooter">CV</Card.Body>
        </Card>
      </div>
      <Card border="secondary" className="FooterCP">
        <Card.Text>© 2022 Copyright: Martin Neme</Card.Text>
        </Card>
    </div>
  );
}
