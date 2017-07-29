## 组件
1. 第一步是用构造器定义`Vue.extend`
2. 第二步注册`Vue.component`
3. 把组件的标签放到对应的视图上

View
```javascript
		<div id="demo">
			<p>{{name}}</p>
			<first-compenent></first-compenent>
		</div>
```
JS
```javascript
		var aaa = Vue.extend({
				template: "<p>这是第一个组件</p>"
			})
		//注册
		//Vue.component("firstCompenent", aaa)
		new Vue({
			el: "#demo",
			data: {
				name: "组件DEMO"
			},
			components: {
				firstCompenent: aaa
			}
		})
```