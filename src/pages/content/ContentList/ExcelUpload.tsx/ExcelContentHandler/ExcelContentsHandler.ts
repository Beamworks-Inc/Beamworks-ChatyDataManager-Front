import {Content} from "../../../../../interfaces/Content.interface";
import {AxiosResponse} from "axios";
import ContentsAPI from "../../../../../apis/content";

interface ExcelContent{
    검수자 : string,
    keyword : string,
    Q : string,
    A : string,
}

class ExcelContentsUploader{
    constructor(private excelContents : Content[]) {

    }

    defaultUploadSuccessHandler(dataIndex : number,totalContentNumber : number){
        console.log(`엑셀 업로드 성공 : ${dataIndex+1}/${totalContentNumber}`);
    }

    defaultUploadFailHandler(dataIndex : number,totalContentNumber : number){
        console.error(`엑셀 업로드 실패 : ${dataIndex+1}/${totalContentNumber}`);
    }

    upload(
        onUploadSuccess:(dataIndex: number,totalContentNumber : number)=>void = this.defaultUploadSuccessHandler,
        onUploadFailed:(dataIndex: number,totalContentNumber : number)=>void = this.defaultUploadFailHandler,
    ){
        this.excelContents.forEach((content,index)=>{
            ContentsAPI.create(content)
                .then((res:AxiosResponse<null>)=>{
                    onUploadSuccess(index,this.excelContents.length);
                })
                .catch((err)=>{
                    onUploadFailed(index,this.excelContents.length);
                })
        })
    }
}

class ValidExcelContentsHandler {
    constructor(private contents: ExcelContent[]){

    }

    getUploader(): ExcelContentsUploader{
        return new ExcelContentsUploader(this.convertToContent())
    }

    convertToContent(): Content[]{
        return this.contents.map((content) => {
            return {
                id: null,
                folderId: 390,
                question: content.Q,
                answer: content.A,
                reference : [],
                rationale : null,
                writeDate: (new Date()).toISOString(),
                writer: null,
                keyword: content.keyword.split('$'),
                reviewerKeyword: content['검수자'],
                review: null,
                status: 'DRAFT'
            }
        })
    }
}


class ExcelContentsHandler{

    setExcelContents(contents : object[]): ValidExcelContentsHandler{
        if(!this.checkIsValidContent(contents)) {
            throw new Error("Invalid Excel Format");
        }
        return new ValidExcelContentsHandler(contents as ExcelContent[])
    }

    instanceOfExcelContent(object: any): object is ExcelContent {
        return '검수자' in object && 'keyword' in object && 'Q' in object && 'A' in object;
    }

    checkIsValidContent(contents : object[]): Boolean{
        return contents.every((content)=>{
            return this.instanceOfExcelContent(content);
        })
    }

}

const excelHandler=new ExcelContentsHandler()
export default excelHandler