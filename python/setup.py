#!/usr/bin/env python

"""The setup script."""

from setuptools import setup


setup(
    name='spacememo',
    packages=['spacememo'],
    python_requires=">=3.6",
    version='0.1.7',
    author='opensourceducation',
    author_email='githubpersonalfor@gmail.com',
    description='📘 a python nanolibrary for apply “spaced repetition” in learning purposes apps 📙',
    long_description=open('./README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/opensourceducation/spacememo',
    license='MIT license',
    keywords=['srs',
              'learning',
              'microlearning',
              'memorization',
              'javascript',
              'space-repetition',
              'python'],
    classifiers=['Programming Language :: Python :: 3',        'Intended Audience :: Education',        'License :: OSI Approved :: MIT License',        'Operating System :: OS Independent', ])
