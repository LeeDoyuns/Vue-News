<template>
    <div>
        <input type="checkbox" id="id" :checked="isDone">
        <label :for="id" >{{label}}</label>
    </div>
    
</template>
<script>

export default {
    name : 'ToDoList',
    props: {
        label: {require: true, type: String},
        done: {default: false, type: Boolean},
        id: {require: true, type: String}
    },
    data(){
        return {
            isDone: this.done
        }
    }
}
</script>