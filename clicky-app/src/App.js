import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./buttons.json";
import "./App.css";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    score: 0,
    topScore: 0,
    clickedFriends: []
  };

  handleClick = id => {
    if (this.state.clickedFriend.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clickedFriend: this.state.clickedFriend.concat(id) });
      this.makeShuffle();
    } else {
      this.handleReset();
    }
  };

  clickedImage = id => {
    let clickedFriends = this.state.clickedFriends;
    let score = this.state.score;
    let topScore = this.state.topScore;

    if (clickedFriends.indexOf(id) === -1) {
      clickedFriends.push(id);
      this.handleIncrement();
      this.makeShuffle();
    } else if (this.state.score === 12) {
      alert("You Win!")
      this.setState({
        score: 0,
        clickedFriends: []
      });
    } else {
      this.setState({
        score: 0,
        clickedFriends: []
      });
      alert("You Lose!")
    }

    if (score > topScore) {
      this.setState({
        topScore: score
      })
    }
    this.makeShuffle(clickedFriends);
  };
  handleIncrement = () => {

    this.setState({ score: this.state.score + 1 });
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      clicked: []
    });
    this.makeShuffle(friends);
  };

  makeShuffle = () => {
    let shuffleFriends = shuffleFriends(friends);
    this.setState({ friends: shuffleFriends });
  };

  render() {
    const shuffledFriends = shuffle(this.state.friends);
    return (
      <Wrapper>
        <Title>Friends List</Title>
        {shuffledFriends.map(friend => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            image={friend.image}
            clickedImage={this.clickedImage}
            handleIncrement={this.handleIncrement}
            handleReset={this.handleReset}
            makeShuffle={this.makeShuffle}

          />
        ))}
      </Wrapper>
    );
  };
}
export default App;
