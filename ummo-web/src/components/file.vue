<template>
    <div>
        <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
        <v-chip small v-if="error" color="red">upload failed</v-chip>
        <v-chip small color="green" v-if="uploaded">uploaded</v-chip>

        <v-text-field
                placeholder="logo"
                solo
                id="file"
                @input="start_loading"
                v-model="service_logo"
                type="file"
        ></v-text-field>
    </div>
</template>

<script>
    export default {
        name: "file",
        data(){
            return {
                service_logo:'',
                loading:false,
                error:false,
                uploaded:false
            }
        },
        methods:{
            async start_loading(){
                this.loading = true
                const fileUploadControl = document.getElementById("file");
                if (fileUploadControl.files.length > 0) {
                    const file = fileUploadControl.files[0];
                    console.log(file)
                    const name = "file";
                     const parseFile = new this.$parse.File(name, file);

                    try {
                        await parseFile.save()
                        this.uploaded = true
                        this.loading = false
                        this.$emit("uploaded",parseFile._url)
                    }catch (e) {
                        this.error = true
                        this.loading = false
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>