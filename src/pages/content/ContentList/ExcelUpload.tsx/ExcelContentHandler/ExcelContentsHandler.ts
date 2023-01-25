import {Content, Reference} from "../../../../../interfaces/Content.interface";
import {AxiosResponse} from "axios";
import ContentsAPI from "../../../../../apis/content";

interface ExcelContent{
    검수여부 : 'O' | 'X',
    검수일자 : string, // MM/DD/YY 형식
    검수자 : string,
    '검수자 카테고리' : string,
    카테고리 : string, // 시작 3개의 카테고리는 트리 구조로 표현, 구분자는 $를 사용, ex) 카테고리1$카테고리2$카테고리3
    Q : string,
    A : string,
    Reference : string, // Reference 는 여러개가 있을 수 있음, 구분자는 \$를 사용, ex) Reference1\$Reference2\$Reference3, 각 Reference 는 URL 형식또는 string 형식이어야 함
}

class ExcelContentsUploader{
    constructor(private excelContents : Content[]) {}

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

    buildUploader(): ExcelContentsUploader{
        return new ExcelContentsUploader(this.convertToContent())
    }

    convertToReference(reference : string): Reference[]{
        const sample={
            title : '',
            description : '',
            link : '',
        }
        return reference.split('\\$').map((ref): Reference=>{
            if(ref.startsWith('http')){
                return {...sample,link:ref}
            }else{
                return {...sample,description:ref}
            }
        })
    }

    convertToContent(): Content[]{
        return this.contents.map((content) => {
            return {
                id: null,
                folderId: 390,
                question: content.Q,
                answer: content.A,
                reference : this.convertToReference(content.Reference),
                rationale : null,
                writeDate: (new Date()).toISOString(),
                writer: null,
                keyword: content['카테고리'].split('$'),
                reviewerKeyword: content['검수자'],
                review: null,
                status: content['검수여부'] === 'O' ? 'APPROVED' : 'DRAFT',
            }
        })
    }
}


class ExcelContentsHandler{

    setExcelContents(contents : object[]): ValidExcelContentsHandler{
        const invalidContentIndexes = this.getInvalidContentIndexes(contents);
        if(invalidContentIndexes.length>0) {
            alert('엑셀 파일의 형식이 잘못되었습니다. 다음 행의 내용을 확인해주세요 : ' + invalidContentIndexes.join(','));
            throw new Error(`엑셀 파일에 잘못된 데이터가 있습니다. 잘못된 데이터가 있는 행 번호 : ${invalidContentIndexes.join(',')}`);
        }
        return new ValidExcelContentsHandler(contents as ExcelContent[])
    }

    isValidDateFormat(date: string): boolean {
        return (new Date(date)).toDateString()!=='Invalid Date'
    }


    isInstanceOfExcelContent(object: any): object is ExcelContent {
        return '검수여부' in object && (object['검수여부'] === 'O' || object['검수여부'] === 'X')
            && '검수일자' in object && typeof object['검수일자'] === 'string' && this.isValidDateFormat(object['검수일자'])
            && '검수자' in object && typeof object['검수자'] === 'string'
            && '검수자 카테고리' in object && typeof object['검수자 카테고리'] === 'string'
            && '카테고리' in object && typeof object['카테고리'] === 'string'
            && 'Q' in object && typeof object['Q'] === 'string'
            && 'A' in object && typeof object['A'] === 'string'
            && 'Reference' in object && typeof object['Reference'] === 'string'
    }


    getInvalidContentIndexes(contents : object[]): number[]{
        return contents.filter((content)=>{
            return !this.isInstanceOfExcelContent(content);
        }).map((content,index)=>(index+1))
    }

}

const excelHandler=new ExcelContentsHandler()
export default excelHandler