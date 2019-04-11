<template>
  <div>
    <span style="margin-right: 20px;padding-left: 5px">{{$t('label.income')}}: {{$store.getters['home/getTotalPrice'][0]}} {{$t('label.yuan')}}</span>
    <span>
      {{$t('label.expense')}}: {{$store.getters['home/getTotalPrice'][1]}} {{$t('label.yuan')}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'total'
  }
</script>
