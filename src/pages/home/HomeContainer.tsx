import {
  Card,
  Col,
  Container,
  Row,
  Stack,
  Image,
  Button,
} from "react-bootstrap";
import playForFun from "@assets/play-for-fun.jpg";
import playRank from "@assets/play-rank.jpg";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PLAY_FOR_FUN } from "@/navigation/const";

interface SelectGameModeCardProps {
  src: string;
  children: ReactNode;
}

const SelectGameModeCard = ({ src, children }: SelectGameModeCardProps) => {
  return (
    <Card border="dark" style={{ borderRadius: "20px" }}>
      <Stack className="align-items-center">
        <Image src={src} alt="src" fluid width="380px"></Image>
        {children}
      </Stack>
    </Card>
  );
};

export default function HomeContainer() {
  return (
    <Container className="font-round text-center">
      <Stack>
        <Row className="mb-3 mt-3">
          <h3>Choose Game Mode</h3>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 1 }} className="d-none d-md-block">
            <SelectGameModeCard src={playForFun}>
              <Link className="american-purple-btn mb-3" to={PLAY_FOR_FUN}>
                Play For Fun
              </Link>
            </SelectGameModeCard>
          </Col>

          <Col md={5} className="d-none d-md-block">
            <SelectGameModeCard src={playRank}>
              <Button className="american-purple-btn mb-3">Play Rank</Button>
            </SelectGameModeCard>
          </Col>

          <Button className="american-purple-btn d-block d-md-none mb-3">
            Play For Fun
          </Button>
          <Button className="american-purple-btn d-block d-md-none">
            Play Rank
          </Button>
        </Row>
      </Stack>
    </Container>
  );
}
