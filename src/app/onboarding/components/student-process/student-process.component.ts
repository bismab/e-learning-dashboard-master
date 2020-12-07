import { OnboardingService } from './../../services/onboarding.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthHelperService } from 'core/services/auth-helper.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-student-process',
  templateUrl: './student-process.component.html',
  styleUrls: ['./student-process.component.css']
})
export class StudentProcessComponent implements OnInit {
  user;
  quizStarted = false;
  next = true;
  model: NgbDateStruct;
  languageOptions: SelectItem[];
  recorded = false;
  recording = false;
  showStepperContent = true;
  quizCompleted = false;
  studentInfo = { studentEduInfo: {} as any, parentInfo: {} as any, languages: [] } as any;
  audioRecordedFile: Blob;
  quiz;
  years = [];
  languages = [{ t: 'Urdu', v: 'urdu' }, { t: 'English', v: 'english' }, { t: 'Punjabi', v: 'punjabi' }, { t: 'Pashto', v: 'pashto' }, { t: 'Sindhi', v: 'sindhi' }, { t: 'Saraiki', v: 'saraiki' }, { t: 'Balochi', v: 'balochi' }, { t: 'Kashmiri', v: 'kashmiri'}];
  selectedQuizQuestion = { q: '', a: '', ma: [], i: 0, detail: { q: {} as any } as any };
  tempLanguages = [];

  audioPlayer;
  audioMediaRecorderInstance;
  constructor(public authHelper: AuthHelperService,
    private onBoardingSer: OnboardingService,
    private el: ElementRef,
    private toastSer: ToastrService) { }

  ngOnInit(): void {
    this.user = this.authHelper.currentUser;
    let date = moment(new Date());
    let y = date.get('years');
    for (let i = 0; i < 20; i++) {
      this.years.push(y - i);
    }
    for (let i = 0; i < this.languages.length; i++) {
      this.tempLanguages.push({ label: this.languages[i].t, value: { l: this.languages[i].v } })
    }
    this.languageOptions = this.tempLanguages;
  }
  ngAfterViewInit() {
    this.audioPlayer = document.querySelector('audio');
  }
  selectDOBVerifcationFile(event) {
    this.studentInfo.DOBVerifcation = null;
    if (event.target.files && event.target.files[0]) {
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#DOBVerifcation');
      this.studentInfo.DOBVerifcation = inputEl.files.item(0);
    }
  }
  studentOnboardingNext() {
    if (this.user.sail == 'none') {
      this.updateStudentPersonalAndEduInfo(this.studentInfo)
    } else if (this.user.sail == 'one') {
      let formData = new FormData();
      formData.append('q', this.selectedQuizQuestion.q);
      formData.append('a', this.selectedQuizQuestion.a);
      formData.append('file', this.audioRecordedFile);
      for (let i = 0; i < this.selectedQuizQuestion.ma.length; i++) {
        formData.append('ma', this.selectedQuizQuestion.ma[i]);
      }
      this.onBoardingSer.answererTheQuestion(formData).subscribe(res => {
        if (res.status && !res.completed) {
          let data = this.nextIterationDataGiver(this.selectedQuizQuestion.i, this.quiz.questions);
          if (data.content) {
            this.selectedQuizQuestion = { q: '', a: '', ma: [], i: 0, detail: { q: {} as any } };
            this.selectedQuizQuestion.i = data.i;
            this.selectedQuizQuestion.detail = data.nextData;
            this.selectedQuizQuestion.q = data.nextData._id
          }
        } else if (res.status && res.completed) {
          this.showStepperContent = false;
          this.quizCompleted = true;
        }

      })
    }
  }

  selectOpInMulti(opId) {
    let updateItem = this.selectedQuizQuestion.ma.find((i) => i == opId);
    let index = this.selectedQuizQuestion.ma.indexOf(updateItem);
    if (index > -1) {
      this.selectedQuizQuestion.ma.splice(index, 1);
    } else {
      this.selectedQuizQuestion.ma.push(opId);
    }
  }

  updateStudentPersonalAndEduInfo(data) {
    // if (data.name && data.age && data.gender && data.studentEduInfo.institute &&
    //   data.studentEduInfo.year && data.studentEduInfo.status && data.studentEduInfo.degree) {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    formData.append('studentEduInfo', JSON.stringify(data.studentEduInfo));
    formData.append('languages', JSON.stringify(data.languages));
    formData.append('parentInfo', JSON.stringify(data.parentInfo));
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('bio', data.bio);
    formData.append('motherTongue', data.motherTongue);
    formData.append('DOBVerifcation', data.DOBVerifcation);
    formData.append('dateOfBirth', ('' + this.model.year) + ('-' + this.model.month) + ('-' + this.model.day));
    console.log(data);

    console.log(formData);
    // return;
    this.onBoardingSer.updateStudentPersonalAndEduInfo(formData).subscribe(res => {
      if (res.status) {
        if (res.data && res.data.token) {
          this.authHelper.setAuthToken = res.data.token;
          this.user = this.authHelper.currentUser;
        }
        this.toastSer.success(res.message);
      } else {
        this.toastSer.error(res.message);
      }
    })
    // } else {
    //   this.toastSer.error("Incomplete info!");
    // }

  }

  startQuiz() {
    this.onBoardingSer.startQuiz().subscribe(res => {
      if (res.status) {
        this.quizStarted = true;
        this.quiz = res.data;
        this.selectedQuizQuestion.i = 0;
        this.selectedQuizQuestion.detail = this.quiz.questions[0];
        this.selectedQuizQuestion.q = (this.quiz.questions[0]) ? this.quiz.questions[0]._id : '';
      }
    })
  }

  recordAudio() {
    let options;
    let audioChunks = [];
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=vp9')) {
      options = { mimeType: 'audio/webm; codecs=vp9' };
    } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=vp8')) {
      options = { mimeType: 'audio/webm; codecs=vp8' };
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.audioMediaRecorderInstance = new MediaRecorder(stream, options);
      this.audioMediaRecorderInstance.start(500);

      this.audioMediaRecorderInstance.addEventListener("dataavailable", (event: any) => {
        audioChunks.push(event.data);
        this.recording = true;
      });

      this.audioMediaRecorderInstance.addEventListener("stop", () => {
        this.audioRecordedFile = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(this.audioRecordedFile);
        // // const audio = new Audio(audioUrl);
        // this.audioPlayer.src = audioUrl;
        let audioPlayer = document.querySelector('audio');
        audioPlayer.src = audioUrl;
        audioPlayer.controls = true;
        this.recorded = true;
        this.recording = false;
        // this.remoteV.src = audioUrl;
        // // audio.play();
      });
    })

  }
  retryRecording() {
    let audioPlayer = document.querySelector('audio');
    audioPlayer.src = '';
    audioPlayer.controls = false;
    this.audioRecordedFile = undefined;
    this.recorded = false;
  }
  stopAudioRecording() {
    this.audioMediaRecorderInstance.stop();
  }

  nextIterationDataGiver(oldIndex, array) {
    let total = array.length;
    if ((oldIndex + 1) == total) {
      return { content: false, completed: true };
    } else {
      return { content: true, completed: false, i: oldIndex + 1, nextData: array[oldIndex + 1] };
    }
  }

}
