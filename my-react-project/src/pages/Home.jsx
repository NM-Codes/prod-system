import GridContainer from "../components/GridContainer/GridContainer"
import Card from "../components/Cards/Cards"

function Home() {
  return(
    <div className="main-container">
      {/* En grid med 2 kolumner */}
      <GridContainer columns={2}>
        <Card
          title={"Titel"}
        />

        <Card
          title={"Titel"}
        />
      </GridContainer>

      {/* fullheight={true} sträcker ut containern för att fylla resten av sidan */}
      <GridContainer columns={2} fullheight={true}>
        <Card
          title={"Titel"}
        />

        <Card
          title={"Titel"}
        />
      </GridContainer>
    </div>
  )
}

export default Home