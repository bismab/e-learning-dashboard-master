import { OnboardingService } from './../../services/onboarding.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthHelperService } from 'core/services/auth-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-process',
  templateUrl: './teacher-process.component.html',
  styleUrls: ['./teacher-process.component.css']
})
export class TeacherProcessComponent implements OnInit {
  user;
  teacherInfo = { teacherAcademicInfo: {} as any } as any;
  classData = {} as any;
  contract = {} as any;
  contractUploaded = false;
  contractFile;
  next = true;
  staticUrl = environment.staticUrl;

  recording = false;
  recorded = false;
  videoRecordedFile: Blob;
  videoPlayer;
  videoMediaRecorderInstance;
  constructor(public authHelper: AuthHelperService,
    private onBoardingSer: OnboardingService,
    private el: ElementRef,
    private modalService: NgbModal,
    private toastSer: ToastrService) { }

  ngOnInit(): void {
    this.user = this.authHelper.currentUser;
    if (this.user.tail == 'none') {
      this.loadPersonalAndAcademicInfo();
    } else if (this.user.tail == 'one') {
      this.next = false;
      this.loadDemoClassRoomData()
    } else if (this.user.tail == 'two') {
      this.next = false;
      this.loadContract();
    }
  }

  ngAfterViewInit() {
    // this.videoPlayer = document.querySelector('video#recording');
  }

  loadDemoClassRoomData() {
    this.onBoardingSer.getTeacherDemoClassInfo().subscribe(res => {
      if (res.status) {
        this.classData = res.data;
        // if (res.data.videoFile) {
        //   this.videoPlayer.src = this.staticUrl + res.data.videoFile;
        // }
      }
    })
  }

  loadContract() {
    this.onBoardingSer.getTeacherContract().subscribe(res => {
      if (res.status) {
        this.contract = res.data;
      }
    })
  }

  teacherOnboardingNext() {
    if (this.user.tail == 'none') {
      this.updateTeacherPersonalAndEduInfo(this.teacherInfo)
    } else if (this.user.tail == 'one') {

    }
  }

  selectContract(event) {
    this.contractFile = null;
    if (event.target.files && event.target.files[0]) {
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#contract');
      let validate = this.fileValidator(inputEl.files.item(0), inputEl);
      if (!validate) {
        return;
      }
      this.contractFile = inputEl.files.item(0);
    }
  }

  selectGovtId(event) {
    this.teacherInfo.govtIdImageFile = null;
    if (event.target.files && event.target.files[0]) {
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#govtId');
      this.teacherInfo.govtIdImageFile = inputEl.files.item(0);
    }
  }

  uploadContract() {
    if (this.contractFile) {
      let formData = new FormData();
      formData.append('contract', this.contractFile);
      this.onBoardingSer.uploadTeacherContract(formData).subscribe(res => {
        if (res.status) {
          this.contractFile = null;
          this.contractUploaded = true;
          this.toastSer.success(res.message);
        } else {
          this.toastSer.error(res.message);
        }
      })
    } else {
      this.toastSer.warning("There is no file selected!");
    }

  }


  updateTeacherPersonalAndEduInfo(data) {
    if (!data.age) {
      this.toastSer.error("Invalid age!");
      return;
    }
    if (data.name && data.age && data.gender && data.teacherAcademicInfo.maxEducation &&
      data.teacherAcademicInfo.maxExperience && data.teacherAcademicInfo.experienceLevel && this.teacherInfo.govtIdImageFile) {
      let formData = new FormData();
      formData.append('name', data.name);
      formData.append('age', data.age);
      formData.append('gender', data.gender);
      formData.append('teacherAcademicInfo', JSON.stringify(data.teacherAcademicInfo));
      formData.append('bio', data.bio);
      formData.append('govtIdImageFile', this.teacherInfo.govtIdImageFile);
      this.onBoardingSer.updateTeacherPersonalAndAcademicInfo(formData).subscribe(res => {
        if (res.status) {
          this.teacherInfo.teacherAcademicInfo.status = 'attempted';
          this.next = false;
          this.toastSer.success(res.message);
        } else {
          this.toastSer.error(res.message);
        }
      })
    } else {
      this.toastSer.error("Incomplete info!");
    }

  }

  loadPersonalAndAcademicInfo() {
    this.onBoardingSer.getTeacherPersonalOrAcademicInfo().subscribe(res => {
      if (res.status) {
        this.teacherInfo = res.data;
        if (!res.data.teacherAcademicInfo) {
          this.teacherInfo.teacherAcademicInfo = {};
        }
        if (this.teacherInfo &&
          this.teacherInfo.teacherAcademicInfo &&
          this.teacherInfo.teacherAcademicInfo.status == 'attempted') {
          this.next = false;
        }
      }
    })
  }

  recordVideo() {
    let options;
    let videoChunks = [];
    let timer;
    this.videoPlayer = document.querySelector('video#recording')
    if (MediaRecorder.isTypeSupported('audio/webm;codecs=vp9')) {
      options = { mimeType: 'video/webm; codecs=vp9' };
    } else if (MediaRecorder.isTypeSupported('audio/webm;codecs=vp8')) {
      options = { mimeType: 'video/webm; codecs=vp8' };
    }
    navigator.mediaDevices.getUserMedia({
      audio: {
        sampleSize: 8,
        echoCancellation: true,
        noiseSuppression: true
      },
      video: true
    }).then(stream => {
      let videoStream = new MediaStream(stream.getVideoTracks());
      this.videoPlayer.src = null;
      this.videoPlayer.srcObject = videoStream;
      this.videoPlayer.controls = false;
      this.videoPlayer.play()
      this.videoMediaRecorderInstance = new MediaRecorder(stream, options);
      this.videoMediaRecorderInstance.start(500);
      timer = setTimeout(() => {
        this.stopVideoRecording();
      }, 300000)
      this.videoMediaRecorderInstance.addEventListener("dataavailable", (event: any) => {
        videoChunks.push(event.data);
        this.recording = true;
        this.recorded = false;
      });

      this.videoMediaRecorderInstance.addEventListener("stop", () => {
        this.videoRecordedFile = new Blob(videoChunks, { type: 'video/webm' });
        clearTimeout(timer);
        let recordedVideo = URL.createObjectURL(this.videoRecordedFile);
        this.videoPlayer.srcObject = null;
        this.videoPlayer.src = recordedVideo;
        this.videoPlayer.controls = true;
        this.recording = false;
        this.recorded = true;
      });
    })

  }

  stopVideoRecording() {
    this.updateDemoClassRecordingAttempts();
  }

  uploadVideoRecording() {
    this.uploadDemoClassRecording(this.videoRecordedFile);
  }

  uploadDemoClassRecording(videoBlob) {
    let formData = new FormData();
    formData.append('demoClassVideo', videoBlob);
    this.onBoardingSer.uploadDemoClassVideo(formData).subscribe(res => {
      if (res.status) {
        this.recorded = false;
        this.modalService.dismissAll();
        this.classData.recordingUploaded = true;
        this.toastSer.success(res.message);
      } else {
        this.toastSer.error(res.message);
      }
    })
  }

  updateDemoClassRecordingAttempts() {
    this.onBoardingSer.updateDemoClassRecordingAttempts().subscribe(res => {
      if (res.status) {
        this.classData.attempts += 1;
        this.videoMediaRecorderInstance.stop();
      }
    })
  }

  openRecordingPopup(content) {
    this.modalService.open(content, { size: 'lg', scrollable: true, windowClass: "dark-modal" });
  }

  fileValidator(file, inputElement) {
    if (file &&
      (file.type != 'application/pdf')
    ) {
      inputElement.value = null;
      inputElement.required = true;
      this.toastSer.error('Invalid file selected! PDF file needed.')
      return false;
    } else if (file && ((file.size > (9.5 * (1024 * 1024))) && (file.type == 'application/pdf'))) {
      inputElement.value = null;
      inputElement.required = true;
      this.toastSer.error('PDF file size is too large! It should be under 9 MB.');
      return false;
    }
    return true;
  }

}
