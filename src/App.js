import "./App.css";
import React from "react";
import DataWindow from "./components/DataWindow.js";
import remove from "./images/icon-remove.svg";
import _ from "lodash";
import myData from "./images/data.json";

class App extends React.Component {
  state = {
    styleClass: "",
    tagfilter: [],
    items: myData,
    filteredItems: myData,
  };

  handleCallback = (style, content) => {
    const { tagfilter, filteredItems } = this.state;

    tagfilter.push(content);
    let uniqTaglist = _.uniq(tagfilter);

    this.setState({
      tagfilter: uniqTaglist,
      styleClass: style,
    });

    let tagsSelected=[]
let filtered = []

for(let i=0; i< filteredItems.length; i++){
  tagsSelected = filteredItems[i].languages.concat(
    filteredItems[i].tools,
    filteredItems[i].level,
    filteredItems[i].role)

    if(tagfilter.every(tag => tagsSelected.includes(tag))){
filtered.push(filteredItems[i])
this.setState({filteredItems: filtered})
    }
    }
}

  removeTag = (e) => {
    const { tagfilter, items } = this.state;
    let selectedTag = e.target.parentElement.parentNode.textContent;

    let newList = tagfilter.filter((tag) => tag !== selectedTag);

    this.setState({
      tagfilter: newList,
    });
let tags =[]
let filtered= []
for(let i=0; i< items.length; i++){
 tags = items[i].languages.concat(
   items[i].tools,
    items[i].level,
    items[i].role)
    if(newList.every(tag => tags.includes(tag))){
      filtered.push(items[i])
this.setState({filteredItems: filtered})
    }
    }
  
    if(newList.length === 0){
      this.setState({filteredItems: items})
    }
console.log("nostrada")
  };


  clear=()=>{
    const { items}=this.state
    this.setState({
      tagfilter: [],
    filteredItems: items})
  }

  render() {
    const { items, styleClass, tagfilter, filteredItems } = this.state;

    let itemList = [];
    if (filteredItems.length === 0) {
      itemList = items;
    } else {
      itemList = filteredItems;
    }

    return (
      <div>
        <div className="header"></div>
        <div className={tagfilter.length > 0 ? styleClass : "top-margin"}>
        <div className="tags-in-filter">
          {tagfilter.map((tag) => (
            <div className="filter-tag-both" key={tagfilter.indexOf(tag)} onClick={this.removeTag}>
              <div className="filter-tag">{tag}</div>
              <div className="x" >
                <img src={remove} alt="remove" />
              </div>
            </div>
          ))}
          </div>
          <p className="clear" onClick={this.clear}>{"Clear"}</p>
        
        </div>
        {itemList.map((item) => (
          <DataWindow
            data={item}
            key={item.id}
            parentCallback={this.handleCallback}
            tagfilter={tagfilter}
          />
        ))}
      </div>
    );
  }
}
export default App;
