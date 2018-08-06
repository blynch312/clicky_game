import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./buttons.json";
import "./App.css";



class App extends Component {
  state = {
    friends: friends,
    score: 0,
    topScore: 0,
    clickedFriends: [],
    isCorrect: ""
  };

  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleClick = id => {
    if (this.state.clickedFriends.indexOf(id) === -1) {
      this.setState({
        // Shuffles the friends json I have imported and returns the newly shuffled array
        friends: this.shuffle(this.state.friends),
        // Takes the previous score and adds one
        score: this.state.score + 1,
        // Compares the current top score to the current score ON CLICK
        topScore: (this.state.score + 1 > this.state.topScore) ? this.state.score + 1 : this.state.topScore,
        // if(this.state.score + 1 > this.state.topScore) {
        //   return this.state.score + 1
        // } else {
        //   return this.state.topScore
        // }
        clickedFriends: [...this.state.clickedFriends, id],
        // let array = [1,2,3,4,5]
        // array.push(6)
        // // Expected outcome of [1,2,3,4,5,6]
        // array = [...array, 6]
        // // Expected outcome of [1,2,3,4,5,6]
        // isCorrect: "You clicked right!"
      });
    } else {
      this.setState({
        friends: this.shuffle(this.state.friends),
        score: 0,
        topScore: (this.state.score + 1 > this.state.topScore) ? this.state.score + 1 : this.state.topScore,
        clickedFriends: [],
        isCorrect: "You lose! Try again?"
      });
    }
  };

  render() {
    // state = {
    //   friends: friends,
    //   score: 0,
    //   topScore: 0,
    //   clickedFriends: [],
    //   isCorrect: ""
    // };
    const { friends, score, topScore, isCorrect } = this.state;

    return (
      <Wrapper>
        <Title>Friends List
          score={score}
          topScore={topScore}
          isCorrect={isCorrect}
        </Title>

        {friends.map(friend => (
          <FriendCard
            key={friend.id}
            handleClick={this.handleClick}
            id={friend.id}
            image={friend.image}
          />
        ))}
      </Wrapper>
    );
  };
}
export default App;