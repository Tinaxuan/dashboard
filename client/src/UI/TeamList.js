function TeamList(props) {
    if (props.teams === -1) {
      return null;
    }
    console.log(props.teams)
  
    return (
      <div 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: 20,
      }}>
        {props.teams.teamB.map(item=>(
            <div key={item}>
                <h2>{item}</h2>
            </div>
        )
        )}
      </div>
    );
  }
  
  export default TeamList;