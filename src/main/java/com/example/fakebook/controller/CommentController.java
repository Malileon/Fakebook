package com.example.fakebook.controller;

import com.example.fakebook.model.UserComment;
import com.example.fakebook.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/getAllComments")
    public List<UserComment> getAllComments(){ return commentService.getAllComments();}
}
