export interface ITask {
    Id: number;
    Status: string;
    Summary: string;
    Type: string;
    Priority: string;
    Tags: string;
    TagsList: string[];
    Estimate: number;
    Assignee: string;
    AssigneeInitials: string;
    ImgUrl: string;
    RankId: number;
}