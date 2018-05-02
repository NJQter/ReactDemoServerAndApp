import React, {Component} from 'react';
//import { BrowserRouter as Router,Route,Link } from 'react-router-dom';

class TabBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabList: props.tabList || [],
            selectedIndex: 0
        }
    }

    autoScroll(index) {
        if (this.refs.tabBar && this.refs.tabBar.scrollTo) {
           this.refs.tabBar.scroll(index * 100,0)
        }
    }

    render() {
        let that = this;
        return (
                <div ref="tabBar" style={{display:'flex',height:44,backgroundColor:'#e5e5e5',whiteSpace:'nowrap',overflowX:'scroll'}}>
                            {
                                that.state.tabList && that.state.tabList.map((tab, index) => {
                                    let isSelected = index === that.state.selectedIndex
                                    let selectedStyle = isSelected ? styles.tabItemSelected : styles.tabItem
                                    return (
                                        <div key={index} style={selectedStyle} onClick={()=>{
                                            if (that.state.selectedIndex !== index) {
                                                that.setState({selectedIndex:index})
                                                if (that.props.onTabItemClicked) {
                                                    that.props.onTabItemClicked(index)
                                                }
                                            }
                                        }}>
                                            <div style={{paddingLeft:14,paddingRight:14}}>
                                                <div>{tab.name}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                </div>
        )
    }
}

const styles = {
    tabItem: {
        display:'flex',
        alignItems:'center'
    },
    tabItemSelected: {
        display:'flex',
        alignItems:'center',
        color:'#0c7f12'
    }
}

export default TabBar;
