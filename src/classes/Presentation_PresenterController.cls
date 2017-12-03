public class Presentation_PresenterController {
    
    public Presentation_PresenterController() {
        System.debug('Inside Presentation_PresenterController constructor');
    }
    
    @AuraEnabled
    public static List<Id> retrieveAttachmentIds(Id presentationId) {
        List<ContentDocumentLink> cDocLinks = [
            SELECT Id, ContentDocumentId, ContentDocument.LatestPublishedVersionId
            FROM ContentDocumentLink 
            WHERE LinkedEntityId = :presentationId
            ORDER BY ContentDocument.Title ASC
        ];
        List<Id> fileIdList = new List<Id>();
        for (ContentDocumentLink cdl : cDocLinks) {
            fileIdList.add(cdl.ContentDocument.LatestPublishedVersionId);
        }
        return fileIdList;
    }
}