import React, {Component} from 'react';
import TabBar from './TabBar';
import request from 'axios';
//import https from  'https';
//import path from 'path';
// import fs from 'fs';

import $ from 'jquery';

// let httpsConfig = {
//     httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//     })
// }


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabList: null,
            itemList: null
        }
        // let privateKey  = fs.readFile(path.join(__dirname, './certificate/private.pem'), 'utf8');
        // let certificate = fs.readFile(path.join(__dirname, './certificate/my.crt'), 'utf8');
        // let credentials = {key: privateKey, cert: certificate};
    }

    componentDidMount() {
        let _url = 'http://172.31.38.78:3001/tabList'
        let that = this

        $.ajax({
            type:'get',
            url:_url,
            success:function(res){
                that.setState({
                    tabList: res.tabList
                });
            }
        })
        // request.get(_url, httpsConfig).then((response)=>{
        //     that.setState({
        //         tabList: response.data && response.data.tabList
        //     })
        // }).catch((err)=> {
        //     alert(err)
        // })
    }

    render() {
        let that = this
        return (
            <div style={{position:'absolute',width:'100%',height:'100%',backgroundColor:'#f9f9f9'}}>
                {
                    this.state.tabList && <TabBar tabList={this.state.tabList} onTabItemClicked={(index)=>{
                        let tab = that.state.tabList[index]
                        let url = 'http://172.31.38.78:3001/itemList'
                        request.get(url,{params:{tabId:tab.tabId}}).then((resp) => {
                            that.setState({
                                itemList:resp.data && resp.data.itemList
                            })
                        })
                    }}/>
                }
                <div style={{display:'flex',flexDirection:'column'}}>
                    {
                        this.state.itemList && this.state.itemList.map((item, index) => {
                            return (
                                    <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:9}}>
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                            <div style={{color:'grey'}}>{index+1}，</div>
                                            <a href="itms-services:///?action=download-manifest&url=https://172.31.38.78:3001/ipa/test.plist">{item.name}</a>
                                        </div>
                                        <div style={{color:'grey'}}>{item.timestamp}</div>
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default App;
