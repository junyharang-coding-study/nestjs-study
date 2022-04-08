export interface Boards {

        id : string;                    // 게시물 고유 번호
        title : string;                 // 게시글 제목
        description : string;          // 게시글 내용
        status : BoardStatus;           // 게시글 비밀글 여부

}   // interface 끝

export enum BoardStatus {
    PUBLIC = "PUBLIC",                  // 공개글
    PRIVATE = "PRIVATE"                 // 비밀글
} // enum class 끝