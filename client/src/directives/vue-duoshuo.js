/**
 * Created by chuck7 on 16/9/25.
 */
import Vue from 'vue'
export default Vue.directive('duoshuo', {
  bind() {
    // 准备工作
    // 例如，添加事件处理器或只需要运行一次的高耗任务
  },
  update(newValue, oldValue) {
    // 值更新时的工作
    // 也会以初始值为参数调用一次

    if(undefined !== newValue.id){
      this.el.innerHTML = ``;
      window.duoshuoQuery.sso = {login : '#!/posts/'+newValue.id,logout:process.env.index+'#!/posts/'+newValue.id};
      let dom = document.createElement('div');
      dom.setAttribute('data-thread-key',newValue.id);
      dom.setAttribute('data-title',newValue.title);
      dom.setAttribute('data-url',process.env.index+'#!/posts/'+newValue.id);
      this.vm.$nextTick(()=>{
        _duoshuoInit(dom,this.el)
      })
    }
  },
  unbind() {
    // 清理工作
    // 例如，删除 bind() 添加的事件监听器
    this.el.innerHTML = ``;
  }
})
function _duoshuoInit(dom,el){
  console.log('before duoshuo insert');
  console.log(document.readyState);
  try{
    DUOSHUO.EmbedThread(dom);
    el.appendChild(dom);
  }catch (err){
    setTimeout(_duoshuoInit.bind(null,dom,el),200);
  }
  console.log('duoshuo insert');
}
