const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('request');
const testUtils = require('./test.utils');

describe('/ Blog Post Integration', function() {

  after(function(done) {
    testUtils.removeTestPosts().then(function(result) {
      done();
    });
  });

  it('Should retrieve all the blog posts', function(done) {
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/api/post',
      headers: {
          'Content-Type': 'application/json'
      }
    };

    request(options, function(error, response, body) {
      const json = JSON.parse(body);
      expect(json.success).to.be.true;
      expect(Array.isArray(json.data.posts)).to.be.true;
      done();
    });
  });

  it('Should retrieve a blog post by id', function(done) {

    testUtils.createTestPost({
        method: 'POST',
        url: 'http://localhost:3000/api/post'
      },{
        'Content-Type': 'application/json',
        'x-access-token': 'secret'
      }, {
        title: 'Test Post',
        author: 'Carlos Linares',
        content: 'Test post from Mocha'
      }).then(function(result) {

        const options = {
          method: 'GET',
          url: `http://localhost:3000/api/post/${result.data.id}`,
          headers: {
              'Content-Type': 'application/json'
          }
        };
        request(options, function(error, response, body) {
          const json = JSON.parse(body);
          expect(json).to.be.an('object');
          expect(json.success).to.be.true;
          expect(json.data.post).to.be.an('object');
          done();
        });
    });
  });

  it('Should create a blog post using access-token', function(done) {
    testUtils.createTestPost({
      method: 'POST',
      url: 'http://localhost:3000/api/post'
    },{
      'Content-Type': 'application/json',
      'x-access-token': 'secret'
    }, {
      title: 'Test Post',
      author: 'Carlos Linares',
      content: 'Test post from Mocha'
    }).then(function(result) {
      expect(result.success).to.be.true;
      expect(result).to.be.an('object');
      expect(result.data.id).to.be.a('string');
      done();
    });
  });

  it('Should fail creating a blog post using wrong access-token', function(done) {
    testUtils.createTestPost({
      method: 'POST',
      url: 'http://localhost:3000/api/post'
    },{
      'Content-Type': 'application/json',
      'x-access-token': 'wrong secret'
    }, {
      title: 'Test Post',
      author: 'Carlos Linares',
      content: 'Test post from Mocha'
    }).then(function(result) {
      expect(result).to.be.a('string');
      expect(result).to.be.equals('Forbidden');
      done();
    });
  })

  it('Should fail creating a blog post with invalid data model', function(done) {
    testUtils.createTestPost({
      method: 'POST',
      url: 'http://localhost:3000/api/post'
    },{
      'Content-Type': 'application/json',
      'x-access-token': 'secret'
    }, {
      title: 'Test Post'
    }).then(function(result) {
      expect(result.success).to.be.false;
      expect(result).to.be.an('object');
      expect(result.message).to.be.a('string');
      expect(result.message).to.be.equals('Invalid Model');
      done();
    });
  })

  it('Should update content of a post', function(done) {
    testUtils.createTestPost({
      method: 'POST',
      url: 'http://localhost:3000/api/post'
    },{
      'Content-Type': 'application/json',
      'x-access-token': 'secret'
    }, {
      title: 'Test Post',
      author: 'Carlos Linares',
      content: 'This post will be updated'
    }).then(function(result) {
      
      const options = {
        method: 'PATCH',
        url: `http://localhost:3000/api/post/${result.data.id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
          content: 'This post was updated'
        }
      };
      request(options, function(error, response, body) {
        const json = body;
        expect(json).to.be.an('object');
        expect(json.success).to.be.true;
        expect(json.data.id).to.be.a('string');
        expect(json.message).to.be.equals('Post updated');
        done();
      });
    });
  })

});