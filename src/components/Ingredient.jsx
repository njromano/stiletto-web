import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Icon from "./Icon";
import Ingredients from "./Ingredients";
class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
    };
  }

  render() {
    const { t } = this.props;

    let http = window.location.protocol;
    let slashes = http.concat("//");
    let host = slashes.concat(window.location.hostname);
    let url =
      host +
      (window.location.port ? ":" + window.location.port : "") +
      "/item/" +
      encodeURI(this.props.ingredient.name.toLowerCase().replaceAll(" ", "_"));
    return (
      <div className="list-group-item">
        <div
          className={
            this.props.ingredient.ingredients != null ? "text-success" : ""
          }
          role={this.props.ingredient.ingredients != null ? "button" : ""}
          onClick={() =>
            this.setState((state) => ({ showList: !state.showList }))
          }
        >
          <Icon
            key={this.props.ingredient.name}
            name={this.props.ingredient.name}
          />
          {this.props.ingredient.count != null && this.props.value != null
            ? Math.ceil(this.props.ingredient.count * this.props.value) + "x "
            : ""}
          {this.props.ingredient.ingredients != null ? (
            t(this.props.ingredient.name)
          ) : (
            <a href={url}>{t(this.props.ingredient.name)}</a>
          )}
        </div>
        <div
          className={
            this.props.ingredient.ingredients != null ? "list-group" : ""
          }
        >
          {this.showSubList()}
        </div>
      </div>
    );
  }

  showSubList() {
    if (this.props.ingredient.ingredients != null && this.state.showList) {
      return this.props.ingredient.ingredients.map((ingredients, i) => (
        <ul
          className="list-group list-group-horizontal"
          key={
            this.props.ingredient.name +
            this.props.ingredient.count * this.props.value +
            i
          }
        >
          <label className="sr-only">----------------------------</label>
          <Ingredients
            crafting={ingredients}
            value={
              ingredients.output != null
                ? (this.props.ingredient.count * this.props.value) /
                  ingredients.output
                : this.props.ingredient.count * this.props.value
            }
          />
          <label className="sr-only">----------------------------</label>
        </ul>
      ));
    }
  }
}

export default withTranslation()(Ingredient);
