import { Subjects, 
         Publisher, 
        ExpirationCompleteEvent 
} from '@pc508tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}