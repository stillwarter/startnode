<script setup>
const props=defineProps({
    cnt:{
        type:[String,Number],
        default:'button'
    },
    backcolor:{
        type:String,
        default:"silver"
    },
    iconpath:String
})
</script>

<template>
    <div class="icobutton" :style="'background:'+backcolor">
        {{ cnt }}
    </div>
</template>

<style lang="less" scoped>
.icobutton{
    background: silver;
    padding: 2px 5px;
    margin-right: 10px;
    border-radius: 6px;
    cursor: pointer;
}
</style>