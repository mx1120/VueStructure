<template>
   <div>
       <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="100">
           <FormItem prop="user">
               <Input type="text" v-model="formInline.user" placeholder="username">
                   <Icon type="ios-person-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
           <FormItem prop="password">
               <Input type="password" v-model="formInline.password" placeholder="Password">
                   <Icon type="ios-locked-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
           <FormItem>
               <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
           </FormItem>
       </Form>
   </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
                formInline: {
                	user: '',
                    password: ''
                },
				ruleInline: {
                	user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'no short than 6', trigger: 'blur' }
                    ]
                }
            }
		},
		created() {
		},
        methods: {
	        handleSubmit(name) {
		        this.$refs[name].validate(valid => {
			        if (valid) {
				        this.$Message.success('Success!');
			        } else {
				        this.$Message.error('Fail!');
				        setTimeout(() => {
					        this.$refs[name].resetFields()
                        },1500  )
			        }
		        })
	        },
            clear() {
                console.info(1)
            }
        }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/scss/base";
</style>