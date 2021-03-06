class GameResult extends React.Component {
  constructor () {
    super ()
    this.state = {
      roundResults: []
    }
  }


  componentWillMount() {
    gameID = this.props.currentGame.id
        $.ajax({
            url: `/games/${gameID}/update_board`,
            method: 'get'
          }).done((response) => {
            this.setState({
              roundResults: response
            })
          }.bind(this))
  }

  render() {
    var robotUsers =
    <ul> { this.props.users.map((user, idx) => {
          if (user.good === false) {
            return(<li>{user.name} was {user.character}</li>)
          }
        })}
    </ul>


    var goodCount = 0
    var evilCount = 0
    for (var i=0; i < this.state.roundResults.length; i++) {
      if (this.state.roundResults[i] === "Good Prevails") {
        goodCount++
      } else {
        evilCount++
      }
    }
    var displayVictory
    if (goodCount >= 3) {
      $('.hide-at-end').hide()
      displayVictory =
      <div>
        <h3>The Humans win!</h3>
        <strong>...unless the Terminator can find who Sarah Connor is!</strong>
        <br/>
        <p>The Robots were:</p>
        {robotUsers}
      </div>
    } else if (evilCount >= 3) {
      $('.hide-at-end').hide()
      displayVictory =
      <div> <h3>THE ROBOTS HAVE WON AND TAKEN OVER THE WORLD!</h3>
      The Robots were: {robotUsers} </div>
    }

    return(
      <div>
        {displayVictory}
      </div>
    )
  }
}
