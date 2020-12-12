(this["webpackJsonpgraphql-typescript-react"]=this["webpackJsonpgraphql-typescript-react"]||[]).push([[0],{219:function(e,t,n){e.exports=n(425)},224:function(e,t,n){},232:function(e,t,n){},415:function(e,t,n){},420:function(e,t,n){},421:function(e,t,n){},425:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(76),c=n.n(o),l=(n(224),n(64)),i=n(37),u=n(14),s=n(32),d=n(33),m=n(35),f=n(34),v=n(36),b=n(173),p=n.n(b),h=(n(232),n(39)),E={};function O(e,t){var n=e.find((function(e){return e.id===t}));return n?n.background:""}Object.entries({blue:"#007aff",orange:"#ff9559",black:"#000000"}).forEach((function(e){var t=Object(u.a)(e,2),n=t[0],a=t[1];E[n]=a}));var g,j=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.options,n=e.votes,a=n?n.map((function(e){var n={seconds:"".concat(e.diffSecond)};for(var a in e.statistic){var r=e.statistic[a];n[O(t,r.id)]=1*r.voteCount}var o=n.orange||0,c=n.blue||0;return n.black=o-c,n})):[];return r.a.createElement("div",{className:"chartHolder"},r.a.createElement(h.c,{width:730,height:500,data:a},r.a.createElement(h.a,{strokeDasharray:"4 6"}),r.a.createElement(h.e,{dataKey:"s"}),r.a.createElement(h.f,null),r.a.createElement(h.d,null),r.a.createElement(h.b,{type:"monotone",dataKey:"black",stroke:E.black}),t.map((function(e){return r.a.createElement(h.b,{key:"vote-of-".concat(e.id),type:"monotone",dataKey:e.background,stroke:E[e.background]})}))))}}]),t}(a.Component),k=(n(415),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={count:0},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props,t=e.option.background,n=e.count;return r.a.createElement("div",{className:"counter-display-box-wrapper"},r.a.createElement("div",{className:"counter-display-box counter-display-".concat(t)},n))}}]),t}(r.a.Component)),y=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).state={votes:{},chartData:[]},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"onSummarize",value:function(){var e=Date.now().valueOf(),t=this.state.votes,n=Object.entries(t).map((function(t){var n=Object(u.a)(t,2);return{id:n[0],voteTs:n[1].map((function(t){return Math.floor(9-(e-t)/500).toFixed(0)}))}})),a=Array.from({length:10},(function(e,t){var a=t.toFixed();return{diffSecond:(t/2).toFixed(1),statistic:n.map((function(e){return{id:e.id,voteCount:e.voteTs.filter((function(e){return e===a})).length}}))}}));this.setState({chartData:a})}},{key:"componentDidMount",value:function(){var e=this,t=window.location.host,n=window.location.protocol.indexOf("s:")>0,a=new WebSocket("".concat(n?"wss":"ws","://").concat(t,"/game"));a.onopen=function(){setTimeout((function(){a.close(),e.onSummarize()}),5e3)},a.onmessage=function(t){var n=JSON.parse(t.data);n.voteTo&&e.setState((function(e){var t=e.votes;return t[n.voteTo]||(t[n.voteTo]=[]),t[n.voteTo].push(Date.now().valueOf()),{votes:t}}))}}},{key:"render",value:function(){var e=this.props.options,t=this.state.votes,n=this.state.chartData,a="http://".concat(window.location.host,"/client");return r.a.createElement("div",null,r.a.createElement(j,{options:e,votes:n}),r.a.createElement("div",null,e?e.map((function(e){var n=t[e.id]?t[e.id].length:0;return r.a.createElement(k,{key:"c-".concat(e.id),option:e,count:n})})):null),r.a.createElement("div",null,"Please go to ",r.a.createElement("a",{target:"blank",href:a},a)," to join the game.",r.a.createElement("div",null,r.a.createElement(p.a,{size:256,value:a,bgColor:"#FFF",fgColor:"#000",includeMargin:!0}))))}}]),t}(r.a.Component),w=(n(85),n(82)),C=n(52),D=n.n(C),V=(n(83),n(21));function I(){var e=Object(w.a)(["\n    query VoteResult {\n  allVoteOptions {\n    id\n    label\n    background\n    voteCount\n  }\n}\n    "]);return I=function(){return e},e}function R(){var e=Object(w.a)(["\n    query RecentVotes($seconds: Int!) {\n  recentVotes(seconds: $seconds) {\n    options {\n      id\n      label\n      background\n    }\n    votes {\n      diffSecond\n      statistic {\n        id\n        voteCount\n      }\n    }\n  }\n}\n    "]);return R=function(){return e},e}function S(){var e=Object(w.a)(['\n    mutation CreateVote($optionId: ID!) {\n  createVote(optionId: $optionId, ip: "server", timestamp: 1) {\n    id\n  }\n}\n    ']);return S=function(){return e},e}!function(e){e.Public="PUBLIC",e.Private="PRIVATE"}(g||(g={}));var T=D()(S());D()(R());var x=D()(I());function F(e){return V.c(x,e)}var N=function(){var e=F(),t=e.data,n=e.error;if(e.loading)return a.createElement("div",null,"Loading...");if(n||!t)return a.createElement("div",null,"ERROR");var r=t.allVoteOptions;return r.sort((function(e,t){return e.label<t.label?1:e.label>t.label?-1:0})),a.createElement(y,{options:r})};n(84),n(420);var P=function(e){var t=e.data,n=t.id,a=t.label,o=t.background,c=Object(V.b)(T,{variables:{optionId:n}}),l=Object(u.a)(c,1)[0];return r.a.createElement("div",{className:"CircleButton CircleButton-".concat(o)},r.a.createElement("a",{href:"#",onClick:function(){l().then((function(e){try{var t=e.data.createVote.id;console.log("You have voted!\n record id: ".concat(t))}catch(n){alert(n)}}))}},a))},q=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.props.options;return r.a.createElement("div",null,e?e.filter((function(e){return e.label})).map((function(e){return r.a.createElement(P,{key:e.id,data:e})})):"")}}]),t}(a.Component),B=function(){var e=F(),t=e.data,n=e.error;if(e.loading)return r.a.createElement("div",null,"Loading...");if(n||!t)return r.a.createElement("div",null,"ERROR");var a=t.allVoteOptions;return a.sort((function(e,t){return e.label<t.label?1:e.label>t.label?-1:0})),r.a.createElement(q,{options:a})};n(421);function $(){return r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(l.b,{to:"/"},"Default")),r.a.createElement("li",null,r.a.createElement(l.b,{to:"/client"},"Client")),r.a.createElement("li",null,r.a.createElement(l.b,{to:"/dashboard"},"Dashboard"))))}function z(){return r.a.createElement("div",null,r.a.createElement("h4",null,"Please select a feature"),r.a.createElement($,null))}var A=function(){return r.a.createElement(l.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("section",null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/dashboard"},r.a.createElement(N,null)),r.a.createElement(i.a,{path:"/client"},r.a.createElement(B,null)),r.a.createElement(i.a,{path:"/"},r.a.createElement(z,null))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=n(188),K=n(9),L=n(428),M=new J.a({uri:"/graphql"});c.a.render(r.a.createElement(K.b,{client:M},r.a.createElement(L.a,{client:M},r.a.createElement(A,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[219,1,2]]]);
//# sourceMappingURL=main.7e79b0fc.chunk.js.map