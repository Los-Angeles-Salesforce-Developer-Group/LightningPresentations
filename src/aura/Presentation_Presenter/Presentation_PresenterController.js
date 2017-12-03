({
	doInit : function(component, event, helper) {
		console.log("Init to win it!");
        var presentationId = component.get("v.recordId");
        console.log("presentationId: " + presentationId);
        var action = component.get("c.retrieveAttachmentIds");
        action.setParams({"presentationId": presentationId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state);
            if (component.isValid() && state === "SUCCESS") {
                var slideIdList = response.getReturnValue();
                component.set("v.slideIds", slideIdList);
                var slideIndex = component.get("v.slideIdx");
                component.set("v.currentSlideId", slideIdList[slideIndex]);
                console.log(slideIdList);
                console.log(slideIdList[slideIndex]);
                var j$ = jQuery.noConflict();
                var slideImgTag = j$("#slideImgTag");
                console.log(slideImgTag);
                slideImgTag.attr("src", "/sfc/servlet.shepherd/version/download/" + slideIdList[slideIndex]);
            }
        });
        $A.enqueueAction(action);
	},
    nextSlide : function(component, event, helper) {
        var slideIdList = component.get("v.slideIds");
        var slideIndex = component.get("v.slideIdx");
        console.log("Previous slideIndex: " + slideIndex);
        if (slideIdList.length <= (slideIndex + 1)) {
            // Do not increment
        } else {
            slideIndex++;
        }
        console.log("Next slideIndex: " + slideIndex);
        component.set("v.currentSlideId", slideIdList[slideIndex]);
        console.log(slideIdList);
        console.log(slideIdList[slideIndex]);
        var j$ = jQuery.noConflict();
        var slideImgTag = j$("#slideImgTag");
        console.log(slideImgTag);
        component.set("v.slideIdx", slideIndex);
        slideImgTag.attr("src", "/sfc/servlet.shepherd/version/download/" + slideIdList[slideIndex]);
    }
})