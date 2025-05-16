import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CourseData, Module, Topic, Video } from '../../Models/course-details';
import { CoursesService } from '../../Services/courses.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  imports: [CommonModule, NavbarComponent],
})
export class VideoPlayerComponent implements OnInit {
  course?: CourseData;
  module?: Module;
  topic?: Topic;
  video?: Video;

  currentVideoList: Video[] = [];
  currentVideoIndex: number = 0;

  constructor(
    private location: Location,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    const navigation = this.location.getState() as any;

    this.course = navigation?.course;
    this.module = navigation?.module;
    this.topic = navigation?.topic;
    this.video = navigation?.video;

    if (this.course && this.module && this.video && this.topic) {
      this.currentVideoList = this.module.topics.flatMap((x) => x.videos);
      this.currentVideoIndex = this.currentVideoList.findIndex(
        (v) => v._id === this.video?._id
      );
    }
  }

  goToNextVideo() {
    if (this.currentVideoIndex < this.currentVideoList.length - 1) {
      this.currentVideoIndex++;
      this.video = this.currentVideoList[this.currentVideoIndex];
      this.videoPlayer.nativeElement.load();
    }
  }

  goToPreviousVideo() {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
      this.video = this.currentVideoList[this.currentVideoIndex];
      this.videoPlayer.nativeElement.load();
    }
  }

  selectVideo(index: number) {
    this.currentVideoIndex = index;
    this.video = this.currentVideoList[this.currentVideoIndex];
    this.videoPlayer.nativeElement.load();
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  onVideoEnded() {
    if (this.course && this.video) {
      this.video.isCompleted = true;
      this.coursesService
        .updateVideoCompletionStatus(this.course?._id, this.video?._id)
        .pipe(
          tap(() => {
            this.video!.isCompleted = true;
          })
        )
        .subscribe();
    }
  }
}
