<aura:application >
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    
    <aura:attribute name="presentationId" type="String" access="global" />
    
    <c:Presentation_Presenter recordId="{!v.presentationId}" />
</aura:application>