import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./buttons.json";
import "./App.css";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    friends,
    score: 0,
    topScore: 0,
    clickedFriends: [],
    isCorrect: ""
  };


  handleClick = id => {
    if (this.state.clickedFriend.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clickedFriend: this.state.clickedFriend.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const updateScore = this.state.score + 1
    this.setState({
      score: updateScore,
      isCorrect: ""
    });
    if (updateScore >= this.state.topScore) {
      this.setState({ topScore: updateScore });
    }
    else if (updateScore === 12) {
      this.setState({ isCorrect: "Winner!" })
    }
    this.makeShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      clicked: [],
      isCorrect: "reset game"
    });
    this.makeShuffle();
  };


  makeShuffle = () => {
    let shuffledCards = shuffle(friends);
    this.setState({ friends: shuffledCards });
  };

  render() {
    const shuffledCards = shuffle(this.state.friends);
    return (
      <Wrapper>
        <Title>Friends List
          score={this.state.score}
          topScore={this.state.topScore}
          isCorrect={this.state.isCorrect}
        </Title>

        {this.state.friends.map(friend => (
          <FriendCard
            key={friend.id}
            handleClick={this.handleClick}
            handleIncrement={this.handleIncrement}
            handleReset={this.handleReset}
            makeShuffle={this.makeShuffle}
            id={friend.id}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  };
}
export default App;
