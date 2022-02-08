import React from "react";

class DataWindow extends React.Component {


    filter=(event)=>{
this.props.parentCallback("filter-window", event.target.textContent)
    }

  render() {
    const { data} = this.props;
   let tags = data.languages.concat(data.tools, data.role, data.level)

    return (
      <div className={data.featured === true ? "data-window left-color" : "data-window"} >
        <img src={require(`../images/${data.logo}.svg`)} alt="" />
        <div className="column">
         <div className="company"><p>{data.company}</p>{data.new ? <div className="new">{"NEW!"}</div> : ""}{data.featured ?<div className="featured">{"FEATURED"}</div>: ""}  </div>
          <h4>{data.position}</h4>
          <ul>
            <li>{data.postedAt}</li>
            <li>{data.contract}</li>
            <li>{data.location}</li>
          </ul>
        </div>
        <div className="tag-row">
          {tags.map((tag) => ( 
            <div className="tags" onClick={this.filter} key={tags.indexOf(tag)}>{tag}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default DataWindow;
