<script>
  import store from '../store';

  export default{
    el:"#chat",
    data(){
      let serverData = store.fetch();
      return {
        //登录用户
        user:serverData.user,
        //用户列表
        userList:serverData.userList,
        //会话列表
        sessionList:serverData.sessionList,
        //搜索key
        search:'',
        //选中的会话index
        sessionIndex:0
      };
    },
    computed:{
      session(){
        return this.sessionList[this.sessionIndex];
      }
    },
    watch:{
      //每当seesionList改变时，保存到localStorage
      seesionList:{
        deep:true,
        handler () {
          store.save({
            user:this.user,
            userList:this.userList,
            sessionList:this.sessionList
          });
        }
      }
    }
  }
</script>

<template>
    <div>
        <div class="sidebar">
            <card></card>
            <list></list>
        </div>
        <div class="main">
            <message></message>
            <text></text>
        </div>
    </div>
</template>

<style lang="less">
  #chat{
    overflow: hidden;
    border-radius: 4px;

    .sidebar, .main{
      height:100%;
    }

    .sidebar{
      float:left;
      width:200px;
      color:#f4f4f4;
      background-color: #2e3238;
    }

    .main{
      position:relative;
      overflow:hidden;
      background-color: #eee;
    }
  }
</style>
