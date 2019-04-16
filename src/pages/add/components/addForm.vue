<template>
  <a-form :form="form" class="add-form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" has-feedback label="标题">
      <a-input
        v-decorator="[
          'title',
          {
            initialValue: $store.state.add.isEdit && this.$store.state.add.edit_obj ? this.$store.state.add.edit_obj.event : null,
            rules: [
              { required: true, message: 'Please input your title!' },
              { min: 2, message: '标题的最小长度为2个字符!' },
              { max: 8, message: '标题的最大长度为8个字符!'}
            ]
          }
        ]"
        placeholder="请输入标题"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" has-feedback label="金额">
      <a-input-number
        v-decorator="[
          'price',
          {
            initialValue: $store.state.add.isEdit && this.$store.state.add.edit_obj ? this.$store.state.add.edit_obj.price : null,
            rules: [
              { required: true, message: 'Please input your Money!' }
            ]
          }
        ]"
        placeholder="请输入金额" style="width: 100%" :min="0" :max="100000"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" has-feedback label="日期">
      <a-date-picker
        v-decorator="[
          'date',
          {
            initialValue: $store.state.add.isEdit && this.$store.state.add.edit_obj ? moment(this.$store.state.add.edit_obj.date, 'YYYY-MM-DD') : null,
            rules: [
              { required: true, message: 'Please select date!' }
            ]
          }
        ]"
        placeholder="请选择日期" style="width: 100%"></a-date-picker>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">
        Commit
      </a-button>
      <a-button type="primary" style="margin-left: 50px" @click="handleCancel">
        Cancel
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import moment from 'moment';
  export default {
    name: 'addForm',
    components: {AFormItem},
    data() {
      return {
        formItemLayout: {
          labelCol: {
            sm: { span: 2 },
          },
          wrapperCol: {
            sm: { span: 20 },
          },
        },
        tailFormItemLayout: {
          wrapperCol: {
            sm: { span: 20, offset: 2 },
          }
        }
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
      this.moment = moment;
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault();

        // 判断是否选中了图标
        let icon = null;
        if (this.$store.state.add.categories_id === -1) {
          this.$message.error('请选择一个收入类型!', 5);
          return;
        } else {
          icon = this.$store.state.add.categories.filter(o => o.id === this.$store.state.add.categories_id)[0].icon;
        }

        this.form.validateFields((err, values) => {
          console.log('start commit....');
          if (err !== null) {
            console.log('err:', err, typeof err, !err);
            this.$message.error('请先处理表单内部的错误项，然后再提交表单!', 5);
            return;
          }

          let item = {
            event: values.title,
            price: values.price,
            type: this.$store.state.add.activeKey,
            cid: this.$store.state.add.categories_id,
            icon,
            date: values.date.format('YYYY-MM-DD') // 时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。
          };

          if (this.$store.state.add.isEdit) {
            item['id'] = this.$store.state.add.edit_obj.id;
            this.$store.dispatch('add/updateEdit', {rootStore: this.$store, axios: this.$axios, item});
          } else {
            this.$store.dispatch('add/addItem', {rootStore: this.$store, axios: this.$axios, item});
          }
          this.$router.push('/')
        });
      },
      handleCancel () {
        if (this.$store.state.add.isEdit) {
          this.$store.commit('add/clearEdit');
        }
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="stylus" scoped>
 .add-form
   margin-top: 30px
</style>
