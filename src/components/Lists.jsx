import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      myObj: [
        { id: 0, songName: "Rain Over Me", Singer: "Mike", royalScore: 0 },
        { id: 1, songName: "Backseat", Singer: "Akon", royalScore: 0 },
        {
          id: 2,
          songName: "See You Again",
          Singer: "Mac Putin",
          royalScore: 0,
        },
        {
          id: 3,
          songName: "Love me like you do",
          Singer: "Justin Bieber",
          royalScore: 0,
        },
        { id: 4, songName: "Baby", Singer: "Justin Bieber", royalScore: 0 },
      ],
    };
  }

  handleIncrement = (id) => {
    const storeTemp = [...this.state.myObj];
    // console.log(id);
    const indexValue = storeTemp.findIndex((data) => data.id === id);
    storeTemp[indexValue].royalScore += 500;
    console.log(storeTemp[indexValue]);

    //Increment for Same Singer
    for (let j = 0; j < this.state.myObj.length; j++) {
      if (
        this.state.myObj[indexValue].Singer === this.state.myObj[j].Singer &&
        this.state.myObj[indexValue].songName !== this.state.myObj[j].songName
      ) {
        const secondIndex = storeTemp.findIndex(
          (val) => val.id === this.state.myObj[j].id
        );
        storeTemp[secondIndex].royalScore += 500;

        this.setState({
          myObj: [...storeTemp],
        });
      }
    }
    this.setState({
      myObj: [...storeTemp],
    });
  };

  renderTableData() {
    return this.state.myObj.map((data, index) => {
      const { id, songName, Singer } = data;
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{songName}</td>
          <td>{Singer}</td>
          <td>
            <button className="btn" onClick={() => this.handleIncrement(id)}>
              Increment Count
            </button>
          </td>
        </tr>
      );
    });
  }
  renderTableHeader() {
    let header = Object.keys(this.state.myObj[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderRoyaltyScore() {
    var result = this.state.myObj.reduce((unique, o) => {
      if (!unique.some((obj) => obj.Singer === o.Singer)) {
        unique.push(o);
      }
      return unique;
    }, []);
    console.log(result, "Unique");

    return result.map((result, index) => {
      const { Singer, royalScore } = result;
      return (
        <div>
          <p key={index}>
            {Singer} Royalty= {royalScore}
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">React Dynamic Table</h1>
        <table id="singers">
          <tbody>
            <tr key={0}>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        {this.renderRoyaltyScore()}
      </div>
    );
  }
}

export default Table;
